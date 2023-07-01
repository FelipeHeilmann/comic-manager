'use client'
import { useState } from "react"
import { Camera, ArrowLeft } from 'lucide-react'

export function ComicForm() {
  const [isComplete, setIsComplete] = useState<Boolean>(false)
  const handleChange = () => {
    setIsComplete(!isComplete)
  }

  return (
    <form className="flex flex-col p-2">
      <a href="/comics">
        <ArrowLeft />
      </a>
      <h2 className="text-center text-lg">Novo quadrinho na sua coleção!</h2>
      <div className="flex justify-between gap-2 p-2">
        <label htmlFor="title">Título</label>
        <input type="text" id="title" className="h-7 border-2 border-black pl-1" />
      </div>

      <div className="flex justify-between p-2">
        <label htmlFor="company">Editora</label>
        <input type="text" id="company" className="h-7 border-2 border-black pl-1" />
      </div>

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="publication_year">Ano de publicação</label>
        <input type="number" id="publication_year" className="h-7 border-2 border-black pl-1" />
      </div>

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="author">Roteirista</label>
        <input type="text" id="author" className="h-7 border-2 border-black pl-1" />
      </div>

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="artist">Artista</label>
        <input type="text" id="artist" className="h-7 border-2 border-black pl-1" />
      </div>

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="isComplete">História completa?</label>
        <input
          type="checkbox"
          name="isComplete"
          id="isComplete"
          value="true"
          onChange={handleChange}
          className="h-5 cursor-pointer w-5 rounded border-gray-400 bg-gray-700 text-purple-500"
        />
      </div>

      {
        isComplete && (
          <div className="flex w-full justify-between gap-2 p-2">
            <label htmlFor="issueNumber">Número da edição</label>
            <input type="number" id="issueNumber" className="h-7 border-2 border-black pl-1" />
          </div>
        )
      }

      <div className="flex w-full justify-between gap-2 p-2">
        <label
          htmlFor="isHardCover"
        >
          Capa dura?
        </label>
        <input
          type="checkbox"
          name="isHardCover"
          id="isHardCover"
          value="true"
          className="h-5 cursor-pointer w-5 rounded border-gray-400 bg-gray-700 text-purple-500"
        />
      </div>

      <div className="flex w-full justify-between gap-2 p-2">
        <label htmlFor="">Foto do quadrinho</label>
        <input type="file" id='image' className="invisible" />
        <label htmlFor="image">
          <Camera className="w-6 h-6 cursor-pointer" />
        </label>
      </div>

      <div className="w-full flex justify-center">
        <button className="p-2 bg-[#d9d9d9] w-32 font-bold uppercase transition duration-300 ease-in-out hover:bg-[#b5b0b0]">Salvar</button>
      </div>
    </form >
  )
}
