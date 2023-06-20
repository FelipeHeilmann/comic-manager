import LoginForm from './components/LoginForm'

export default function Home() {
  return (
    <main className="main-container grid h-screen w-full grid-cols-2 gap-10 p-16">
      <div className="">
        <p className="text-2xl leading-relaxed text-white">
          Nossa aplicação foi cuidadosamente projetada para ajudar você a
          organizar e gerenciar sua coleção de quadrinhos de forma fácil e
          conveniente. Com nossa plataforma online, você terá total controle
          sobre os quadrinhos que possui, além de poder adicionar, editar e
          excluir itens com apenas alguns cliques.
          <br /> Aqui você poderá adicionar, editar e deletar quadrinhos da sua
          coleção de uma maneira rápida, prática e fácil!
          <br />
          Não importa se você é um colecionador ávido ou está apenas começando
          sua coleção, nossa aplicação de organização de coleções de quadrinhos
          é a ferramenta perfeita para ajudá-lo a catalogar e gerenciar seus
          tesouros. Aproveite a facilidade de uso, a interface intuitiva e o
          controle total sobre sua coleção. Então, não perca mais tempo
          procurando por suas histórias em quadrinhos! Comece agora mesmo e
          descubra como nossa aplicação pode transformar a maneira como você
          organiza e desfruta de sua coleção.
        </p>
      </div>
      <div className=" flex h-1/2 w-[670px] justify-center bg-[#D9D9D9] bg-opacity-40 px-20 py-5">
        <LoginForm />
      </div>
    </main>
  )
}
