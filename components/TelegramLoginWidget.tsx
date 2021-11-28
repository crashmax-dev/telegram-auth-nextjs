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
    className = '',
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
      onClick={dataOnAuth}
      className={['telegram-login-widget', ...className.split(' ')].join(' ')}
    >
      {isLoading ? <LoadingIco /> : <TelegramIco />}
      {children}
      <style>{`
        .telegram-login-widget {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem 1rem 0.5rem 1rem;
          font-size: 16px;
          border-radius: 999px;
          font-family: system-ui;
          user-select: none;
          cursor: pointer;
          color: #FFFFFF;
          background-color: #54A9EB;
        }

        .telegram-login-widget__icon {
          display: inline-block;
          vertical-align: top;
          margin-right: 12px;
          width: 24px;
          height: 24px;
        }
      `}</style>
    </div>
  )
}
