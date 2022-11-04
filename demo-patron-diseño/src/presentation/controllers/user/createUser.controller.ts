import { NextFunction, Request, Response } from 'express'
//import { DynamoDBUserRepository } from '../../../infrastructure/implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { InMemoryUserRepository } from '../../../infrastructure/implementations/InMemory/InMemoryUserRepository'
import { UserCreatorUseCase } from '../../../application/usecases/UserCreator'

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    username,
    age,
    name
  } = req.body

  const inMemoryUserRepository = new InMemoryUserRepository()
  const userCreatorUseCase = new UserCreatorUseCase(inMemoryUserRepository)

  try {
    const userCreated = await userCreatorUseCase.run({
      name,
      username,
      age
    })

    res.json(userCreated)
    return
  } catch (e) {
    return next(e)
  }
}
