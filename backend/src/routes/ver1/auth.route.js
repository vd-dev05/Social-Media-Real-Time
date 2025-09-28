import { Router } from 'express'
import {AuthController} from '@/controllers/auth.controller.js'
const AuthRourter = Router()

AuthRourter.get('/' , (req, res) => res.send('Auth route'))

export default AuthRourter