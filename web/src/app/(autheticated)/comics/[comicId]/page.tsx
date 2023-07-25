import { cookies } from 'next/headers'
import { api } from '@/app/libs/api'
import { ProfileAside } from '@/app/components/Profile/ProfileAside'
import Image from 'next/image'

interface Comic {
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

export default async function ComicDetailsPage({
  params,
}: {
  params: { comicId: string }
}) {
  const token = cookies().get('token')?.value
  const { comicId } = params

  const response = await api.get(`/comic/${comicId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const comic: Comic = response.data

  console.log(comic)

  return (
    <main className="flex">
      <ProfileAside />
      <div className=" flex w-full p-2 ">
        <div className="mr-4">
          <Image
            className=""
            src={comic.coverUrl}
            width={200}
            height={200}
            alt="Picture of the author"
          />
        </div>
        <div>
          <h2>
            Título:
            <span className="font-bold"> {comic.title}</span>
          </h2>
          <h2>
            Edição:
            <span className="font-bold"> {comic.issueNumber} </span>
          </h2>
          <h2>
            Ano de publicação:
            <span className="font-bold"> {comic.publication_year}</span>{' '}
          </h2>
          <h2>
            Editora original:
            <span className="font-bold"> {comic.company}</span>
          </h2>
          <h2>
            Roteirista:
            <span className="font-bold"> {comic.author}</span>
          </h2>
          <h2>
            Desenhista:
            <span className="font-bold"> {comic.artist}</span>
          </h2>
          {comic.isHardCover === true && (
            <h2>
              <span className="font-bold">Capa Dura</span>
            </h2>
          )}
          <a
            href="#"
            className="mt-4 inline-block bg-yellow-400 p-2 transition duration-300 ease-in-out hover:bg-yellow-600"
          >
            Editar
          </a>
          <a
            href="#"
            className=" ml-2 inline-block bg-red-600 p-2 transition duration-300 ease-in-out hover:bg-red-800"
          >
            Excluir
          </a>
        </div>
      </div>
    </main>
  )
}
