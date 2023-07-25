'use client'

import Link from 'next/link'

interface Props {
  _id: string
  title: string
  company: string
  coverUrl: string
}

export function Comic({ _id, title, company, coverUrl }: Props) {
  const checkCompany = () => {
    switch (company) {
      case 'Marvel':
        return 'bg-red-500'
      case 'DC':
        return 'bg-blue-500'
      case 'Image Comics':
        return 'bg-green-500'
      case 'Pipoca e Nanquim':
        return 'bg-yellow-500'
      case 'Conrad':
        return 'bg-orange-500'
      case 'Dark Horse':
        return 'bg-black'
    }
  }

  const imageStyle = {
    backgroundImage: `url('${coverUrl}')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  return (
    <Link
      href={`/comics/${_id}`}
      className="parent relative flex h-60 w-44 cursor-pointer flex-col items-center justify-end rounded-lg border-2 border-black py-1"
      style={imageStyle}
    >
      <div className="content absolute bottom-0 left-0 flex h-0 w-full flex-col items-center justify-center gap-1 opacity-0">
        <p className="text-center text-white">{title}</p>
        <p
          className={`h-fit ${checkCompany()} w-fit rounded-md  p-1 text-white`}
        >
          {company}
        </p>
      </div>
    </Link>
  )
}
