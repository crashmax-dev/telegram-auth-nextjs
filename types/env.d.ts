declare namespace NodeJS {
  interface ProcessEnv {
    BOT_TOKEN: string
    MONGODB_URI: string
    NEXT_PUBLIC_BOT_ID: string
    NEXT_PUBLIC_BOT_NAME: string
    NEXT_PUBLIC_DEV_HASH: string
    SESSION_COOKIE_NAME?: string
    SESSION_COOKIE_SECRET: string
  }
}
