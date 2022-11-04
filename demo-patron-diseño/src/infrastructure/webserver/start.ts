import 'module-alias/register'
import path from 'path'
import * as dotenv from 'dotenv'
import { app } from './api-rest/app'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
  })

  new app().start()
} catch (error) {
  console.log(error)
}
