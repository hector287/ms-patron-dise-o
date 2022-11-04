import { NextFunction, Request, Response } from 'express'
//import { DynamoDBUserRepository } from '../../../infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { UserGetterUseCase } from '../../../application/usecases/UserGetter'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const inMemoryUserRepository = new InMemoryUserRepository()
  const userGetterUseCase = new UserGetterUseCase(inMemoryUserRepository)

  try {
    const users = await userGetterUseCase.run()
    res.json(users)
    return
  } catch (e) {
    return next(e)
  }
}
