import { User } from '../../../domain/models/user/User'
import { Nullable } from '../../../domain/Nullable'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { DynamoDB } from '../../../infrastructure/database/dynamoDB/connection'

export class DynamoDBUserRepository implements UserRepository {
  private readonly _db = DynamoDB.getInstance()

  async getAll (): Promise<User[]> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'ENTITY_TYPE = :entity',
      ExpressionAttributeValues: {
        ':entity': {
          S: 'USER'
        }
      }
    }).promise()

    const items = (response.Items != null) ? response.Items : []

    const users = items.map((item: any) => {
      const age: string = item.age.N ?? ''
      const id: string = item['usuario'].S ?? ''
      const name: string = item.name.S ?? ''
      const username: string = item.username.S ?? ''

      return new User({
        id: "",
        name,
        username,
        age: Number(age)
    })
    })

    return users
  }

  async save (user: User): Promise<User> {
    await this._db.putItem({
      TableName: DynamoDB.TABLE_NAME,
      Item: {
        'usuario': {
          S: `USER_${user.id}`
        },
        'USUARIO_SK': {
          S: `USER_${user.id}`
        },
        ENTITY_TYPE: {
          S: 'USER'
        },
        username: {
          S: user.username
        },
        name: {
          S: user.name
        },
        age: {
          N: `${user.age ?? ''}`
        }
      }
    }).promise()

    return user
  }

  async getByUserName (username: string): Promise<Nullable<User>> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': {
          S: username
        }
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const age: string = item.age.N ?? ''
    const id: string = item['usuario'].S ?? ''
    const name: string = item.name.S ?? ''
    const usernameItem: string = item.username.S ?? ''

    return new User({
      id: "",
      name,
      username: usernameItem,
      age: Number(age)
    })
  }

  async update (user: User): Promise<User> {
    await this._db.updateItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'usuario': {
          S: `USER_${user.id}`
        },
        'USUARIO_SK': {
          S: `USER_${user.id}`
        }
      },
      UpdateExpression: 'set #username = :username, #name = :name, #age = :age',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#username': 'username',
        '#age': 'age'
      },
      ExpressionAttributeValues: {
        ':username': {
          S: user.username
        },
        ':name': {
          S: user.name
        },
        ':age': {
          N: `${user.age ?? ''}`
        }
      }
    }).promise()

    return user
  }

  async delete (user: User): Promise<void> {
    await this._db.deleteItem({
      TableName: DynamoDB.TABLE_NAME,
      Key: {
        'usuario': {
          S: `USER_${user.id}`
        },
        'usuarioo': {
          S: `USER_${user.id}`
        }
      }
    }).promise()
  }

  async getById (id: string): Promise<Nullable<User>> {
    const response = await this._db.scan({
      TableName: DynamoDB.TABLE_NAME,
      FilterExpression: '#pk = :pk',
      ExpressionAttributeNames: {
        '#pk': 'usuario'
      },
      ExpressionAttributeValues: {
        ':pk': {
          S: `USER_${id}`
        }
      }
    }).promise()

    const item = (response.Items !== undefined) ? response.Items[0] : undefined

    if (item === undefined) return null

    const age: string = item.age.N ?? ''
    const idItem: string = item['usuario'].S ?? ''
    const name: string = item.name.S ?? ''
    const usernameItem: string = item.username.S ?? ''

    return new User({
      id: "",
      name,
      username: usernameItem,
      age: Number(age)
    })
  }
}
