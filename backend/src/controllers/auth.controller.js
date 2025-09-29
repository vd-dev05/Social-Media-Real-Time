import { AuthService } from '../services/auth.service.js'

export const AuthController = {
  async register(req, res) {
   
    
    try {
      const user = await AuthService.register(req.body)
      res.status(201).json({ success: true, user })
    } catch (err) {
      res.status(400).json({ success: false, message: err.message })
    }
  },

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body)
      res.status(200).json({ success: true, ...result })
    } catch (err) {
      res.status(401).json({ success: false, message: err.message })
    }
  }
}
