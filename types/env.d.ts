declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string
    NEXT_PUBLIC_BOT_ID: number
    NEXT_PUBLIC_BOT_NAME: string
    SESSION_COOKIE_NAME?: string
    SESSION_COOKIE_SECRET: string
  }
}
