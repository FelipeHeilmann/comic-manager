'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../libs/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateUserSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório'),
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().nonempty('A senha é obrigatória'),
})

type CreateUserFormData = z.infer<typeof CreateUserSchema>

export default function SignForm() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<String>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
  })

  const createUser = (data: any) => {
    api
      .post('/auth/register', data)
      .then((res) => {
        router.push('/')
      })
      .catch((err) => {
        const { message } = err.response.data
        setErrorMessage(message)
      })
  }
  return (
    <div className="h-auto w-2/4 bg-[#d9d9d9] bg-opacity-50 p-6">
      <form
        onSubmit={handleSubmit(createUser)}
        className=" flex h-full w-full flex-col items-center space-y-10"
      >
        <h2 className="text-2xl font-bold text-black">Cadastrar</h2>
        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="name" className="text-xl font-bold">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="h-10 w-full p-3"
            {...register('name')}
          />
          {errors.name && (
            <span className="text-red-800">{errors.name.message}</span>
          )}
        </div>
        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="email" className="text-xl font-bold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="h-10 w-full p-3"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-red-800">{errors.email.message}</span>
          )}
        </div>

        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="password" className="text-xl font-bold">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className="h-10 w-full p-3"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-800">{errors.password.message}</span>
          )}
        </div>

        <div className="flex w-full justify-center">
          <button
            className=" h-10 w-1/2 border-2 border-black bg-[#d9d9d9] font-bold uppercase transition duration-300 ease-in-out hover:bg-[#b5b0b0]"
            type="submit"
          >
            Cadastrar
          </button>
        </div>
        {errorMessage && (
          <span className="text-lg font-bold">{errorMessage}</span>
        )}
      </form>
    </div>
  )
}
