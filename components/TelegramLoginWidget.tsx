import React, { useState } from 'react'
import { TelegramWidget } from 'lib/telegram-widget'
import { TelegramIco, LoadingIco } from './Icons'
import type { TelegramUserData } from 'types/user'

interface Props {
  botId: string
  children?: string
  className?: string
  requestAccess?: boolean
  onLogin: (user: TelegramUserData) => void
}

/**
 * Related project
 * @link https://github.com/thisisamir98/telegram-login-button
 * @author Amir Ghezelbash
 * @license MIT
 */
export default function TelegramLoginWidget(props: Props) {
  const [poput, setPoput] = useState<Window>()
  const [isLoading, setIsLoading] = useState(false)

  const {
    botId,
    onLogin,
    className,
    requestAccess = true,
    children = 'Log in with Telegram'
  } = props

  const dataOnAuth = () => {
    if (!isLoading) {
      const widget = new TelegramWidget(botId, requestAccess)
      widget.auth(onLogin, setIsLoading)
      setPoput(widget.popup.window!)
    } else if (poput) {
      poput.focus()
    }
  }

  return (
    <div
      className={className}
      onClick={dataOnAuth}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 1rem 0.5rem 1rem',
        fontSize: '16px',
        borderRadius: '999px',
        fontFamily: 'system-ui',
        userSelect: 'none',
        cursor: 'pointer',
        color: '#FFFFFF',
        backgroundColor: '#54A9EB'
      }}
    >
      {isLoading ? <LoadingIco /> : <TelegramIco />}
      {children}
    </div>
  )
}
