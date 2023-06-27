import { getUser } from '@/app/libs/auth'
import { LogOut } from 'lucide-react'

interface Props {
  quantity?: number
}

// eslint-disable-next-line camelcase
export function ProfileAside({ quantity }: Props) {
  // eslint-disable-next-line camelcase
  const { name, created_at } = getUser()
  // eslint-disable-next-line camelcase
  const year = created_at ? new Date(created_at).getFullYear() : undefined
  return (
    <aside className="flex h-screen w-52 flex-col items-center space-y-5 bg-[#CECBCB] py-5">
      <div className="flex flex-col items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-black"></div>
        <p className="text-center text-xl">{name}</p>
      </div>
      <div className="space-y-5">
        <p>Membro desde: {year}</p>
        <p>Quadrinhos: {quantity}</p>
        <ul>
          <li>Marvel</li>
          <li>DC</li>
        </ul>
      </div>
      <div className="flex h-full w-full items-end justify-center">
        <a
          className="flex h-10 w-36 cursor-pointer justify-self-end bg-red-600 p-2 transition duration-300 ease-in-out hover:bg-red-700"
          href="/api/auth/logout"
        >
          <LogOut />
          Quero sair
        </a>
      </div>
    </aside>
  )
}
