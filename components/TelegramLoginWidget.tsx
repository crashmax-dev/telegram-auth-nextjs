import React, { useRef, useEffect, useState } from 'react'

export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

interface Props {
  botId: number
  botName: string
  children?: string
  textColor?: string
  buttonColor?: string
  className?: string
  cornerRadius?: number
  requestAccess?: boolean
  onLogin: (user: TelegramUser) => void
}

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (
          { bot_id }: { bot_id: number },
          callback: (user: TelegramUser) => void
        ) => void
      }
    }
  }
}

/**
 * @link https://github.com/thisisamir98/telegram-login-button
 * @author Amir Ghezelbash
 * @license MIT
 */
const TelegramLoginWidget = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const {
    botId,
    botName,
    onLogin,
    className = '',
    children = 'Log in with Telegram',
    textColor = '#FFFFFF',
    buttonColor = '#54A9EB',
    cornerRadius = 9999,
    requestAccess = true
  } = props

  const dataOnAuth = () => {
    if (window.Telegram && !isLoading) {
      setIsLoading(true)
      window.Telegram.Login.auth(
        { bot_id: botId },
        onLogin
      )
    }
  }

  useEffect(() => {
    if (ref.current === null) return

    const script = document.createElement('script')
    script.src = 'https://telegram.org/js/telegram-widget.js?15'
    script.setAttribute('data-telegram-login', botName)

    if (requestAccess) {
      script.setAttribute('data-request-access', 'write')
    }

    script.async = true

    ref.current.appendChild(script)
  }, [])

  return (
    <div
      ref={ref}
      onClick={dataOnAuth}
      className={[
        'telegram-button',
        ...className.split(' ')
      ].join(' ')}
    >
      {isLoading ?
        <svg
          style={{ background: 'initial' }}
          viewBox="0 0 24 24"
          className="telegram-ico"
        >
          <defs>
            <linearGradient x1="28.154%" y1="63.74%" x2="74.629%" y2="17.783%" id="a">
              <stop stopColor="currentColor" offset="0%"></stop>
              <stop stopColor="#fff" stopOpacity="0" offset="100%"></stop>
            </linearGradient>
          </defs>
          <g transform="translate(2)" fill="none">
            <circle stroke="url(#a)" strokeWidth="2" cx="10" cy="12" r="10"></circle>
            <path d="M10 2C4.477 2 0 6.477 0 12" stroke="currentColor" strokeWidth="2"></path>
          </g>
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </svg> : <i className="telegram-ico"></i>
      }
      {children}
      <style>{`
        iframe {
          display: none;
        }

        .telegram-button {
          padding-left: 1rem;
          padding-right: 1rem;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          line-height: initial;
          user-select: none;
          cursor: ${isLoading ? 'no-drop' : 'pointer'};
          color: ${textColor};
          background-color: ${buttonColor};
          border-radius: ${cornerRadius}px
        }

        .telegram-ico {
          display: inline-block;
          vertical-align: top;
          background: no-repeat 0 0;
          width: 24px;
          height: 24px;
          margin-right: 13px;
          background: url(data:image/svg+xml,%3Csvg%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22m1.95617055%2011.392196c5.77764656-2.42328736%209.63031585-4.02086673%2011.55800785-4.79273807%205.5039525-2.20384954%206.6476266-2.5866818%207.3930574-2.59932314.1639507-.00278035.5305319.0363352.7679878.22182361.2005031.15662277.2556695.36819788.2820684.51669348.026399.1484956.0592719.48677234.0331404.75109194-.2982611%203.0169019-1.5888322%2010.33812718-2.2454015%2013.71710898-.2778191%201.4297738-.8288514%201.7357846-1.3584441%201.7826999-1.1509274.1019576-2.0208916-.5588425-3.1356211-1.2622918-1.7443316-1.1007592-2.3854935-1.3972358-4.0786694-2.4713734-1.95675765-1.2413519-.8891962-1.8911034.2259543-3.0061212.2918402-.2918054%205.3989024-4.83750096%205.497052-5.24030969.0122753-.05037796-.1557336-.55407742-.2716182-.65323489-.1158847-.09915747-.2869204-.06524947-.4103446-.03828214-.17495.03822537-2.9615423%201.81132342-8.35977698%205.31929412-.79096496.5228681-1.50739646.7776269-2.1492945.7642766-.70764107-.0147176-2.06885864-.3851791-3.08078398-.7018404-1.24116762-.388398-1.69932554-.5713149-1.61342745-1.2309348.04474105-.3435709.36011227-.7024173.94611366-1.0765391z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E) no-repeat 0 -1px;
        }
      `}</style>
    </div>
  )
}

export default TelegramLoginWidget
