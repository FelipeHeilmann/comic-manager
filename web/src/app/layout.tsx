import './globals.css'
import { ReactNode } from 'react'
import { Open_Sans } from 'next/font/google'

const open = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Comic manager',
  description: 'Uma aplicação web para te ajudar a organizar sua coleção de quadrinhos',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={open.className}>{children}</body>
    </html>
  )
}
