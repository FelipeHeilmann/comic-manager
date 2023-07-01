import './globals.css'
import { ReactNode } from 'react'
// eslint-disable-next-line camelcase
import { Open_Sans } from 'next/font/google'

const open = Open_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'Comic manager',
  description:
    'Uma aplicação web para te ajudar a organizar sua coleção de quadrinhos',
}

interface RootLayoutProps {
  children: ReactNode
  isLoginPage?: boolean
}

export default function RootLayout({ children, isLoginPage }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={open.className}>{children}</body>
    </html>
  )
}
