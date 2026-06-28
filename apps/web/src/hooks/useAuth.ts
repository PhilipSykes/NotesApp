import { API_URL } from '@/config'
import { useQuery } from '@tanstack/react-query'

interface User {
  id: string
  email: string
  name: string | null
  avatar: string | null
}

async function fetchMe(): Promise<User> {
  const res = await fetch(API_URL+'/auth/me', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Not authenticated')
  const data = await res.json()
  return data.user
}

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    retry: false,
  })

  return { user, isLoading }
}
