import Head from 'next/head'
import Header from './Header'
import GithubCorner from './GithubCorner'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>Next.js Telegram Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>{`
        .github-corner {
          fill: #000;
          color: #FFF;
          position: absolute;
          top: 0;
          border: 0;
          right: 0;
        }

        .github-corner:hover .octo-arm {
          animation: octocat-wave 560ms ease-in-out;
        }

        @keyframes octocat-wave {
          0%, 100% {
            transform: rotate(0);
          }
          20%, 60% {
            transform: rotate(-25deg);
          }
          40%, 80% {
            transform: rotate(10deg);
          }
        }

        @media (max-width:500px) {
          .github-corner:hover .octo-arm {
            animation: none;
          }
          .github-corner .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
          }
        }
      `}</style>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-10 mt-10 mb-10 gap-10">
        <GithubCorner />
        <Header />
        {children}
      </main>
    </div>
  )
}
