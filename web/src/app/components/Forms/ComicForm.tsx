'use client'
import { useState } from 'react'
import { Camera, ArrowLeft } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/app/libs/api'
import Cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

const ComicSchema = z.object({
  title: z.string().nonempty('O campo título é obrigatório'),
  company: z.string().nonempty('O campo editora é obrigatório'),
  publication_year: z.string(),
  author: z.string().nonempty('O campo roteirista é obrigatório'),
  artist: z.string().nonempty('O campo artista é obrigatório'),
  pages: z.string().nonempty('O campo páginas é obrigatório'),
  isComplete: z.boolean(),
  issueNumber: z.string(),
  isHardCover: z.boolean(),
  coverUrl: z
    .instanceof(FileList)
    .transform((list) => list.item(0))
    .refine(
      (file) => file!.size <= 5 * 104 * 1024,
      'O arquivo deve ter até 5MB',
    ),
})

type ComicFormData = z.infer<typeof ComicSchema>

export function ComicForm() {
  const router = useRouter()
  const [isComplete, setIsComplete] = useState<Boolean>(true)
  const handleChange = () => {
    setIsComplete(!isComplete)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComicFormData>({
    resolver: zodResolver(ComicSchema),
  })

  const createComic = async (data: ComicFormData) => {
    const {
      title,
      company,
      author,
      artist,
      pages,
      isHardCover,
      isComplete,
      issueNumber,
      // eslint-disable-next-line camelcase
      publication_year,
      coverUrl,
    } = data

    const token = Cookie.get('token')

    const formData = new FormData()
    formData.append('file', coverUrl!)

    const uploadResponse = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const coverUrlPath = `http://localhost:3333/files/${uploadResponse.data}`

    await api
      .post(
        '/newComic',
        {
          title,
          company,
          author,
          artist,
          // eslint-disable-next-line camelcase
          publication_year,
          issueNumber,
          isComplete,
          pages,
          isHardCover,
          coverUrl: coverUrlPath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        router.push('/comics')
      })
  }

  return (
    <form onSubmit={handleSubmit(createComic)} className="flex flex-col p-2">
      <a href="/comics">
        <ArrowLeft />
      </a>
      <h2 className="text-center text-lg">Novo quadrinho na sua coleção!</h2>
      <div className="w-ful flex justify-between gap-2 p-2">
        <label htmlFor="title">Título</label>
        <input
          {...register('title')}
          type="text"
          id="title"
          className="h-7 border-2 border-black pl-1"
        />
      </div>
      {errors.title && (
        <span className="text-red-600">{errors.title.message}</span>
      )}

      <div className="flex justify-between p-2">
        <label htmlFor="company">Editora</label>
        <input
          {...register('company')}
          type="text"
          id="company"
          className="h-7 border-2 border-black pl-1"
        />
      </div>
      {errors.company && (
        <span className="text-red-600">{errors.company.message}</span>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="publication_year">Ano de publicação</label>
        <input
          {...register('publication_year')}
          type="number"
          id="publication_year"
          className="h-7 border-2 border-black pl-1"
        />
      </div>
      {errors.publication_year && (
        <span className="text-red-600">{errors.publication_year.message}</span>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="pages">Paginas</label>
        <input
          {...register('pages')}
          type="number"
          id="pages"
          className="h-7 border-2 border-black pl-1"
        />
      </div>
      {errors.title && (
        <span className="text-red-600">{errors.title.message}</span>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="author">Roteirista</label>
        <input
          {...register('author')}
          type="text"
          id="author"
          className="h-7 border-2 border-black pl-1"
        />
      </div>
      {errors.title && (
        <span className="text-red-600">{errors.title.message}</span>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="artist">Artista</label>
        <input
          {...register('artist')}
          type="text"
          id="artist"
          className="h-7 border-2 border-black pl-1"
        />
      </div>
      {errors.artist && (
        <span className="text-red-600">{errors.artist.message}</span>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="isComplete">História completa?</label>
        <input
          {...register('isComplete')}
          type="checkbox"
          id="isComplete"
          onChange={handleChange}
          className="h-5 w-5 cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-500"
        />
      </div>
      {errors.isComplete && (
        <span className="text-red-600">{errors.isComplete.message}</span>
      )}

      {isComplete && (
        <div className="flex w-full justify-between gap-2 p-2">
          <label htmlFor="issueNumber">Número da edição</label>
          <input
            {...register('issueNumber')}
            type="number"
            id="issueNumber"
            className="h-7 border-2 border-black pl-1"
          />
          {errors.issueNumber && (
            <span className="text-red-600">{errors.issueNumber.message}</span>
          )}
        </div>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="isHardCover">Capa dura?</label>
        <input
          {...register('isHardCover')}
          type="checkbox"
          id="isHardCover"
          className="h-5 w-5 cursor-pointer rounded border-gray-400 bg-gray-700 text-purple-500"
        />
      </div>
      {errors.isHardCover && (
        <span className="text-red-600">{errors.isHardCover.message}</span>
      )}

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="">Foto do quadrinho</label>
        <input
          {...register('coverUrl')}
          accept="image/*"
          type="file"
          id="image"
          className="invisible"
        />
        <label htmlFor="image">
          <Camera className="h-6 w-6 cursor-pointer" />
        </label>
      </div>

      <div className="flex w-full justify-center">
        <button
          type="submit"
          className="w-32 bg-[#d9d9d9] p-2 font-bold uppercase transition duration-300 ease-in-out hover:bg-[#b5b0b0]"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}
