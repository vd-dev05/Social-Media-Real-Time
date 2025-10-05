
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  const { data: todos } = await supabase.from('todo').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}
