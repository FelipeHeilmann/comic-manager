export function ProfileAside() {
  return (
    <aside className="flex h-screen w-52 flex-col items-center space-y-5 bg-[#CECBCB] py-5">
      <div>
        <div className="h-20 w-20 rounded-full bg-black"></div>
        <p className="text-center text-xl">Nome</p>
      </div>
      <div className="space-y-5">
        <p>Membro desde: 2020</p>
        <p>Quadrinhos: 100</p>
        <ul>
          <li>Marvel</li>
          <li>DC</li>
        </ul>
      </div>
    </aside>
  )
}
