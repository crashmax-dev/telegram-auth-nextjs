declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string
    MONGODB_URI: string
    NEXT_PUBLIC_BOT_ID: string
    NEXT_PUBLIC_BOT_NAME: string
    SESSION_COOKIE_NAME?: string
    SESSION_COOKIE_SECRET: string
  }
}
