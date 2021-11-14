import Link from './Link'

export default function Header() {
  return (
    <h1 className="text-4xl font-bold">
      Next.js{' '}
      <Link href="https://core.telegram.org/widgets/login">
        Telegram Login Widget
      </Link>
    </h1>
  )
}