export default function LoginForm() {
  return (
    <form className=" flex w-full flex-col items-center space-y-5 px-10">
      <h2 className="text-2xl font-bold text-black">Login</h2>
      <div className="flex w-full flex-col space-y-2">
        <label htmlFor="email" className="text-xl font-bold">
          Email
        </label>
        <input type="email" id="email" className="h-10 w-full p-3" />
      </div>

      <div className="flex w-full flex-col space-y-2">
        <label htmlFor="password" className="text-xl font-bold">
          Senha
        </label>
        <input type="password" id="password" className="h-10 w-full p-3" />
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
