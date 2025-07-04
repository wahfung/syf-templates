import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

import Loading from '@components/common/Loading';
import PageNotFoundView from '@components/common/PageNotFoundView';
import MainLayout from '@layouts/Layout';
import TextGeneration from '@pages/TextGeneration';
import Home from '@pages/Home';
import Dapp from '@pages/Dapp';
import User from '@pages/user';

const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
);

const Test = lazy(() => import('@components/useImmerTest'));
const Routes: RouteObject[] = [];

const commonRoute = [
  { path: '*', element: <PageNotFoundView /> },
  { path: '404', element: <PageNotFoundView /> },
];

export const mainRoute = [
  { path: '/', element: <Home />, title: '首页' },
  { path: '/Dapp', element: <Dapp />, title: 'Dapp' },
  { path: '/text-generation', element: <TextGeneration />, title: 'AI对话' },
  { path: '/test', element: <Test />, title: 'immerTest' },
  { path: '/user', element: <User />, title: 'User' },
];

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [...commonRoute, ...mainRoute],
};

const DemoRoutes = {
  // path: 'yideng',
  // element: <Layout />,
  // children: [{ path: 'test', element: <Test /> }],
};

Routes.push(mainRoutes, DemoRoutes);

export default Routes;
