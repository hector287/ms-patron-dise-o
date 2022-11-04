
export class User {
  id: string
  name: string
  username: string
  age?: number

  constructor ({
    id,
    name,
    username,
    age
  }: { id: string, name: string, username: string, age?: number }) {
    this.id = id
    this.name = name
    this.username = username
    this.age = age
  }
}

