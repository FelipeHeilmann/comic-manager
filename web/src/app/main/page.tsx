import { ProfileAside } from '../components/Profile/ProfileAside'
import { api } from '../libs/api'
import { cookies } from 'next/headers'

interface Comic {
  name: string
  comics: []
  created_at: string
}

export default async function Home() {
  const token = cookies().get('token')?.value
  const response = await api.get('/comics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const comics: Comic[] = response.data.comic[0].comics
  console.log(comics)
  return (
    <main>
      <ProfileAside quantity={comics.length} />
    </main>
  )
}
