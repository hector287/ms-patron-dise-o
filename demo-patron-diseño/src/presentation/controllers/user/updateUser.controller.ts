import { NextFunction, Request, Response } from 'express'
import { DynamoDBUserRepository } from '../../../infrastructure/implementations/dynamoDB/DynamoDBUserRepository'
import { UserUpdaterUseCase } from '../../../application/usecases/UserUpdater'
import { User } from '../../../domain/models/user/User'

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const {
    name,
    username,
    age
  } = req.body

  const userId = req.params.userId

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  try {
    const userToUpdate: User = {
      age,
      id: userId,
      name,
      username
    }

    const user = await userUpdaterUseCase.run(userToUpdate)
    res.json(user)
    return
  } catch (e) {
    return next(e)
  }
}
