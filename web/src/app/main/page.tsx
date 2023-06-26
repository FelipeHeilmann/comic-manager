'use client'
import { useEffect, useState } from 'react'
import { ProfileAside } from '../components/Profile/ProfileAside'
import { api } from '../libs/api'
import Cookies from 'js-cookie'

interface Comic {
  name: string
  comics: []
  created_at: string
}

export default function Home() {
  const token = Cookies.get('token')
  const [comics, setComics] = useState<Comic>()
  useEffect(() => {
    api
      .get('/comics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComics(res.data.comic[0])
        console.log(comics)
      })
  }, [])
  return (
    <main>
      <ProfileAside
        name={comics?.name}
        created_at={comics?.created_at}
        quantity={comics?.comics.length}
      />
    </main>
  )
}
