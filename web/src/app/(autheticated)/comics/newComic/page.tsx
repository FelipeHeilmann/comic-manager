import { EmptyComicsList } from '../../../components/EmpyComicsList'
import { Comic } from '../../../components/Profile/Comic'
import { ProfileAside } from '../../../components/Profile/ProfileAside'
import { api } from '../../../libs/api'
import { cookies } from 'next/headers'

interface Comics {
  _id: string
  title: string
  company: string
  issueNumber: number
  coverUrl: string
  publication_year: number
  author: string
  artist: string
  isHardCover: boolean
}

export default async function Home() {
  const token = cookies().get('token')?.value
  const response = await api.get('/comics', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const comics: Comics[] = response.data.comics

  return (
    <main className="flex">
      <ProfileAside quantity={comics.length} />
      <section className="flex flex-1 flex-wrap gap-5 p-5">
        {comics.length > 0 ? (
          comics.map((comic) => {
            return (
              <Comic
                key={comic._id}
                _id={comic._id}
                company={comic.company}
                title={comic.title}
                coverUrl={comic.coverUrl}
              />
            )
          })
        ) : (
          <EmptyComicsList />
        )}
        <EmptyComicsList />
      </section>
    </main>
  )
}
