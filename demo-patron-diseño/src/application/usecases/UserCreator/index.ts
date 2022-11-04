import { User } from '../../../domain/models/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UserAlreadyExistsException } from '../../../domain/exceptions'

interface UserInput {
  name: string
  age: number
  username: string
}

export class UserCreatorUseCase {
  private readonly _userRepository: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName

  constructor (userRepository: UserRepository) {
    this._userRepository = userRepository
  }

  async run (params: UserInput): Promise<User> {
    const user = new User({
      id: "123qwe",
      name: params.name,
      username: params.username,
      age: params.age
    })

    const existUser: boolean = false

    if (existUser) throw new UserAlreadyExistsException()

  

    const userCreated: User = await this._userRepository.save(user)

    return userCreated
  }
}
