// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import type { IronSessionOptions } from 'iron-session'
import type { GetServerSidePropsContext, GetServerSidePropsResult, NextApiHandler } from 'next'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_COOKIE_SECRET,
  cookieName: process.env.SESSION_COOKIE_NAME ?? 'iron-session'
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<P extends Record<string, unknown>>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions)
}