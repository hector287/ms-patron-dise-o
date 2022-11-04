import { Router} from 'express'
import authMiddleware from '../middlewares/authMiddleware'
import {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController
} from '../../../presentation/controllers/index'


export default function userRouter() {
   // const router = express.Router();
    const route = Router()
  
route.route('/:id').delete(authMiddleware,deleteUserController)
route.route('/:userId').put(authMiddleware,updateUserController)
route.route('').get(authMiddleware,getAllUsersController)
route.route('').post(authMiddleware,createUserController)
    return route;
  }