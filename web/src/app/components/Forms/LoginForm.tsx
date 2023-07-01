'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../libs/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const LoginSchema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().nonempty('A senha é obrigatória'),
})

type LoginUserFormData = z.infer<typeof LoginSchema>

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<String>('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(LoginSchema),
  })

  const loginUser = (data: any) => {
    const { email, password } = data

    const base64Credentials = btoa(email + ':' + password)
    api
      .post(
        '/auth',
        {},
        {
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
        },
      )
      .then((res) => {
        const { token } = res.data
        const cookieExpiresInSeconds = 60 * 60 * 24 * 30
        Cookies.set('token', token, { expires: cookieExpiresInSeconds })
        router.push('/comics/')
      })
      .catch((err) => {
        const { message } = err.response.data
        setErrorMessage(message)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className=" flex h-fit w-full flex-col items-center space-y-10 max-md:space-y-2"
    >
      <h2 className="text-xl font-bold text-black">Login</h2>
      <div className="flex w-full flex-col space-y-2 px-10">
        <label htmlFor="email" className="text-lg font-bold">
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

      <div className="flex w-full flex-col space-y-2 px-10">
        <label htmlFor="password" className="text-lg font-bold">
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
          Logar
        </button>
      </div>

      {errorMessage && (
        <span className="text-lg font-bold">{errorMessage}</span>
      )}

      <a className="font-bold text-black hover:text-gray-700" href="/signup/">
        Não Possui conta? Clique aqui para se cadastrar!
      </a>
    </form>
  )
}
