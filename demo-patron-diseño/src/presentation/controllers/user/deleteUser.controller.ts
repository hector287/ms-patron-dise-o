import { NextFunction, Request, Response } from 'express'
import { UserDeleterUseCase } from '../../..//application/usecases/UserDeleter'
import { DynamoDBUserRepository } from '../../../infrastructure/implementations/dynamoDB/DynamoDBUserRepository'

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.id

  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)

  try {
    const userDeleted = await userDeleterUseCase.run(userId)
    res.json(userDeleted)
    return
  } catch (e) {
    return next(e)
  }
}
