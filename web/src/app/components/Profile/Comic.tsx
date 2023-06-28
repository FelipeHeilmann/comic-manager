interface Props {
  title: string
  company: string
  coverUrl: string
}

export function Comic({ title, company, coverUrl }: Props) {
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

  const divStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${coverUrl}')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  }

  return (
    <div
      className={`flex h-60 w-44 cursor-pointer flex-col items-center justify-end rounded-lg border-2 border-black py-1`}
      style={divStyle}
    >
      <p className="text-white">{title}</p>
      <p className={`h-fit ${checkCompany()} w-fit rounded-md  p-1 text-white`}>
        {company}
      </p>
    </div>
  )
}
