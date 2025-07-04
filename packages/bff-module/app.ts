import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import render from 'koa-swig';
import serve from 'koa-static';
import cors from '@koa/cors';
import co from 'co';
import {addAliases} from 'module-alias'
import { createContainer, Lifetime,asClass } from 'awilix';

import { loadControllers, scopePerRequest } from 'awilix-koa';
// 重定向路由
import { historyApiFallback } from 'koa2-connect-history-api-fallback';


import Database from './database/index'
import UserService from './services/UserService'



addAliases({
  '@interfaces': `${__dirname}/interfaces`,
  '@configs': `${__dirname}/configs`,
  '@middlewares': `${__dirname}/middlewares`,
});
import config from '@configs/index'


const { viewDir, memoryFlag,port,staticDir } = config

const app = new Koa();
const container = createContainer();


// ioc di 注入服务  aop
container.loadModules([`${__dirname}/services/*.ts`], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime:Lifetime.SCOPED
  }
})
container.register({
  // 数据库连接 - 单例
  database: asClass(Database).singleton(),
})
app.use(bodyParser())
// 跨域
app.use(cors())
// 获取注入的服务
app.use(scopePerRequest(container))

app.context.render = co.wrap(
  render({
    root: viewDir,
    autoescape: true,
    cache: <'memory' | false>memoryFlag,
    writeBody: false,
    ext: 'html',
  })
);

// 静态资源
app.use(serve(staticDir));
app.use(historyApiFallback({ index: '/', whiteList: ['/api'] }));
// 获取路由
app.use(loadControllers(`${__dirname}/routers/*.ts`))

app.listen(port, '0.0.0.0' ,() => {
  console.log('Server BFF启动成功');
});