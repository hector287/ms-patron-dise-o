import { Router } from 'express'

import {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController
} from '../../../../presentation/controllers/index'

const route = Router()

route.delete('/:id', deleteUserController)
route.put('/:userId', updateUserController)
route.route('').get(getAllUsersController)
route.route('').post(createUserController)

export default route
