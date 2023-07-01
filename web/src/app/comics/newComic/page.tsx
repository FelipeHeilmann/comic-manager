import { ComicForm } from '@/app/components/Forms/ComicForm'
import { ProfileAside } from '@/app/components/Profile/ProfileAside'

export default function Home() {
  return (
    <main className="flex">
      <ProfileAside />
      <section className="flex flex-1">
        <ComicForm />
      </section>
    </main>
  )
}
