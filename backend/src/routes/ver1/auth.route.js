import { Router } from 'express'
import { AuthController } from '../../controllers/auth.controller'
const AuthRourter = Router()

AuthRourter.post('/register' , AuthController.register)
AuthRourter.post('/login' , AuthController.login)

export default AuthRourter