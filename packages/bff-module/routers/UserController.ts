import { GET, POST, PUT, DELETE, route } from 'awilix-koa'
import Router from 'koa-router'
import { IUserService } from '@interfaces/IUserService'

@route('/api/users')
class UserController {
  private userService: IUserService

  constructor({ userService }: { userService: IUserService }) {
    this.userService = userService
  }

  @POST()
  async createUser(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    try {
      const user = await this.userService.createUser(ctx.request.body as any)
      ctx.body = {
        success: true,
        data: user,
        message: '用户创建成功'
      }
    } catch (error: any) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  }

  @GET()
  async getUsers(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    try {
      const users = await this.userService.getUsers()
      ctx.body = {
        success: true,
        data: users
      }
    } catch (error: any) {
      ctx.status = 500
      ctx.body = { error: error.message }
    }
  }

  @route('/:id')
  @GET()
  async getUserById(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    try {
      const id = parseInt(ctx.params.id)
      if (isNaN(id)) {
        ctx.status = 400
        ctx.body = { error: '无效的用户ID' }
        return
      }

      const user = await this.userService.getUserById(id)
      if (!user) {
        ctx.status = 404
        ctx.body = { error: '用户不存在' }
        return
      }

      ctx.body = {
        success: true,
        data: user
      }
    } catch (error: any) {
      ctx.status = 500
      ctx.body = { error: error.message }
    }
  }

  @route('/:id')
  @PUT()
  async updateUser(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    try {
      const id = parseInt(ctx.params.id)
      if (isNaN(id)) {
        ctx.status = 400
        ctx.body = { error: '无效的用户ID' }
        return
      }

      const user = await this.userService.updateUser(id, ctx.request.body as any)
      ctx.body = {
        success: true,
        data: user,
        message: '用户更新成功'
      }
    } catch (error: any) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  }

  @route('/:id')
  @DELETE()
  async deleteUser(
    ctx: Router.IRouterContext,
    next: () => Promise<any>
  ): Promise<any> {
    try {
      const id = parseInt(ctx.params.id)
      if (isNaN(id)) {
        ctx.status = 400
        ctx.body = { error: '无效的用户ID' }
        return
      }

      await this.userService.deleteUser(id)
      ctx.body = {
        success: true,
        message: '用户删除成功'
      }
    } catch (error: any) {
      ctx.status = 400
      ctx.body = { error: error.message }
    }
  }
}

export default UserController