import  dbPostgres ,{  client } from '@/config/postgres.js'

export const DevicesModel = {
  async createDevice({ name, type, user_id }) {
    const [device] = await dbPostgres('devices')
      .insert({ name, type, user_id })
      .returning(['id', 'device_id', 'type', 'user_id'])
    return device
  }

 
}
