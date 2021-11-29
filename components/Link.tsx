type Props = {
  href: string
  children: string
}

export default function Link({ href, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      className="text-telegram hover:underline"
    >
      {children}
    </a>
  )
}
