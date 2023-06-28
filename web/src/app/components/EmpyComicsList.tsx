'use client'
import { Plus } from 'lucide-react'

export function EmptyComicsList() {
  return (
    <div
      onClick={() => {
        console.log('aa')
      }}
      className=" flex h-60 w-44 cursor-pointer flex-col items-center justify-center space-y-5 bg-[#D3D3D3]  transition duration-300 ease-in-out hover:bg-[#b5b0b0]"
    >
      <Plus className="h-16 w-16" />
      <p>Adicionar quadrinho</p>
    </div>
  )
}
