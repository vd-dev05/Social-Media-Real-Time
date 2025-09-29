import { dbPostgres } from '@/config/postgres.js'

export const UserModel = {
  async createUser({ name, email, password_hash }) {
    const [user] = await dbPostgres('users')
      .insert({ name, email, password_hash })
      .returning(['id', 'name', 'email', 'avatar_url', 'role'])
    return user
  },

  async findByEmail(email) {
    return await dbPostgres('users').where({ email }).first()
  },

  async findById(id) {
    return await dbPostgres('users').where({ id }).first()
  }
}
