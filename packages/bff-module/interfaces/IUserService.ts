import { User } from '@prisma/client'

export interface CreateUserDto {
  name: string
  email: string
  age?: number
}

export interface UpdateUserDto {
  name?: string
  email?: string
  age?: number
}

export interface IUserService {
  createUser(data: CreateUserDto): Promise<User>
  getUsers(): Promise<User[]>
  getUserById(id: number): Promise<User | null>
  updateUser(id: number, data: UpdateUserDto): Promise<User>
  deleteUser(id: number): Promise<User>
}
