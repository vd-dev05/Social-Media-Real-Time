import { pgNodejs } from '@/config/postgres.js'

export const UserModel = {
  async createUser({ name, email, password_hash }) {
    const [user] = await pgNodejs('users')
      .insert({ name, email, password_hash })
      .returning(['id', 'name', 'email', 'avatar_url', 'role'])
    return user
  },

  async findByEmail(email) {
    return await pgNodejs('users').where({ email }).first()
  },

  async findById(id) {
    return await pgNodejs('users').where({ id }).first()
  }
}
