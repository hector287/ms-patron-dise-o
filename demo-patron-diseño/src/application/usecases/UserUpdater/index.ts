import { User } from '../../../domain/models/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

interface UserInput {
  name: string
  age: number
  username: string
  id: string
}

export class UserUpdaterUseCase {
  private readonly _userRepository: UserRepository
  private readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: User): Promise<User> {
    const user = await this._userGetterById.run(data.id)

    const dataToUpdate =new User({
      id: data.id,
name: data.name ?? user.name,
username: data.username ?? user.username,
age: data.age ?? user.age
  })

    const userUpdated: User = await this._userRepository.update(dataToUpdate)
    return userUpdated
  }
}

