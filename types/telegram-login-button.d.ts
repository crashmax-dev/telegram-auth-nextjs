import { TelegramUser } from 'telegram-login-button'

declare module 'telegram-login-button' {
  export interface TelegramAuthData extends Omit<TelegramUser, 'username' | 'photo_url'> {
    id: number
    first_name: string
    last_name?: string
    username?: string
    photo_url?: string
    auth_date: number
    hash: string
  }
}
