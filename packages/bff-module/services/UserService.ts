import { User } from '@prisma/client'
import { IUserService, CreateUserDto, UpdateUserDto } from '@interfaces/IUserService'
import { IDatabase } from '@interfaces/IDatabase'

class UserService implements IUserService {
  private database: IDatabase

  constructor({ database }: { database: IDatabase }) {
    this.database = database
  }

  async createUser(data: CreateUserDto): Promise<User> {
    console.log('📝 写操作：创建用户')
    return await this.database.write().user.create({ data })
  }

  async getUsers(): Promise<User[]> {
    console.log('📖 读操作：查询用户')
    return await this.database.read().user.findMany({
      orderBy: { id: 'asc' }
    })
  }

  async getUserById(id: number): Promise<User | null> {
    console.log('📖 读操作：查询单个用户')
    return await this.database.read().user.findUnique({
      where: { id }
    })
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    console.log('📝 写操作：更新用户')
    return await this.database.write().user.update({
      where: { id },
      data
    })
  }

  async deleteUser(id: number): Promise<User> {
    console.log('📝 写操作：删除用户')
    return await this.database.write().user.delete({
      where: { id }
    })
  }
}

export default UserService