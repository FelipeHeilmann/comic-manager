'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserLoginSchema = z.object({
  email: z
    .string()
    .nonempty('O email é obrigatório')
    .email('Formato de email inválido'),
  password: z.string().nonempty('A senha é obrigatória'),
})

type LoginUserFormData = z.infer<typeof createUserLoginSchema>

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(createUserLoginSchema),
  })

  const loginUser = (data: any) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(loginUser)}
      className=" flex h-full w-full flex-col items-center space-y-10"
    >
      <h2 className="text-2xl font-bold text-black">Login</h2>
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
          Logar
        </button>
      </div>

      <a className="font-bold text-black hover:text-gray-700" href="#">
        Não Possui conta? Clique aqui para se cadastrar!
      </a>
    </form>
  )
}
