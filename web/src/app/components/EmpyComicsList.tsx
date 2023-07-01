'use client'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function EmptyComicsList() {
  const router = useRouter()
  const newComic = () => {
    router.push('/comics/newComic')
  }
  return (
    <div
      onClick={newComic}
      className=" flex h-60 w-44 cursor-pointer flex-col items-center justify-center space-y-5 bg-[#D3D3D3]  transition duration-300 ease-in-out hover:bg-[#b5b0b0]"
    >
      <Plus className="h-16 w-16" />
      <p>Adicionar quadrinho</p>
    </div>
  )
}
