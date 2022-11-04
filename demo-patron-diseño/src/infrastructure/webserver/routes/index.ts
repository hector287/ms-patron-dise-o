import { Router} from 'express'
import userRouter from './user';

export default function routes() {
  const route = Router()
  route.use('/api/v1/users', userRouter());
}
