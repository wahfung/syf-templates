import { PrismaClient } from '@prisma/client'
import { IDatabase } from '@interfaces/IDatabase'

class Database implements IDatabase {
  private writeClient: PrismaClient
  private readClient: PrismaClient

  constructor() {
    this.writeClient = new PrismaClient({
      datasources: { db: { url: process.env.DATABASE_WRITE_URL! } }
    })
    
    this.readClient = new PrismaClient({
      datasources: { db: { url: process.env.DATABASE_READ_URL! } }
    })
  }

  write(): PrismaClient {
    return this.writeClient
  }

  read(): PrismaClient {
    return this.readClient
  }

  async disconnect(): Promise<void> {
    await this.writeClient.$disconnect()
    await this.readClient.$disconnect()
  }
}

export default Database