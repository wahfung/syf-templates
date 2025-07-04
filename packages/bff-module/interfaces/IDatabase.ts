import { PrismaClient } from '@prisma/client'

export interface IDatabase {
  write(): PrismaClient
  read(): PrismaClient
  disconnect(): Promise<void>
}