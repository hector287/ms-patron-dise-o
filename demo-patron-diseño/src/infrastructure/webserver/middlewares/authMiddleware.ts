//import authServiceImpl from '../../services/authService';
//import authServiceInterface from '../../../application/services/authService';
import { NextFunction, Request, Response  } from 'express'

export default function authMiddleware(req:Request, res:Response, next:NextFunction) {
  console.log("authMiddleware")
  // Get token from header
  const token = req.header('Authorization');
  //const authService = authServiceInterface(authServiceImpl());
  if (!token) {
    throw new Error('No access token found');
  }
  if (token.split(' ')[0] !== 'Bearer') {
    throw new Error('Invalid access token format');
  }
  try {
    //const decoded = authService.verify(token.split(' ')[1]);
    //req.user = decoded.user;
    next();
  } catch (err) {
    throw new Error('Token is not valid');
  }
}
