import { EmptyComicsList } from '../components/EmpyComicsList'
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

  return (
    <main className="flex">
      <ProfileAside quantity={comics.length} />
      <section className="flex-1 p-5">
        {comics.length > 0 ? <h2>Ola</h2> : <EmptyComicsList />}
      </section>
    </main>
  )
}
