import { getUser } from '@/app/libs/auth'

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
    </aside>
  )
}
