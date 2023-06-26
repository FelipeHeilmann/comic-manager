import LoginForm from './components/Forms/LoginForm'

export default function Home() {
  return (
    <main className="main-container flex h-screen items-center justify-center overflow-hidden">
      <div className="flex w-4/5 justify-center max-md:flex-col-reverse max-md:items-center">
        <div className="h-full w-full pr-5">
          <p className="text-justify text-xl leading-relaxed text-white max-xl:text-base max-md:text-center">
            Nossa aplicação foi cuidadosamente projetada para ajudar você a
            organizar e gerenciar sua coleção de quadrinhos de forma fácil e
            conveniente. Com nossa plataforma online, você terá total controle
            sobre os quadrinhos que possui, além de poder adicionar, editar e
            excluir itens com apenas alguns cliques.
          </p>
          <p className="text-justify text-xl leading-relaxed text-white max-xl:text-base max-md:text-center">
            Não importa se você é um colecionador ávido ou está apenas começando
            sua coleção, nossa aplicação de organização de coleções de
            quadrinhos é a ferramenta perfeita para ajudá-lo a catalogar e
            gerenciar seus tesouros. Aproveite a facilidade de uso, a interface
            intuitiva e o controle total sobre sua coleção. Então, não perca
            mais tempo procurando por suas histórias em quadrinhos! Comece agora
            mesmo e descubra como nossa aplicação pode transformar a maneira
            como você organiza e desfruta de sua coleção.
          </p>
        </div>
        <div className="flex w-full justify-center bg-[#D9D9D9] bg-opacity-40 py-5">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}
