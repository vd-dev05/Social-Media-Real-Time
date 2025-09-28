import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '@/models/postgres/user.model.js'

export const AuthService = {
  async register({ name, email, password }) {
    const existed = await UserModel.findByEmail(email)
    if (existed) throw new Error('Email đã tồn tại')

    const password_hash = await bcrypt.hash(password, 10)
    const newUser = await UserModel.createUser({ name, email, password_hash })
    return newUser
  },

  async login({ email, password }) {
    const user = await UserModel.findByEmail(email)
    if (!user) throw new Error('Email không tồn tại')

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) throw new Error('Mật khẩu sai')

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        role: user.role
      },
      token
    }
  }
}
