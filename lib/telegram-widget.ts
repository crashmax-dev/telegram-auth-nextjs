import React from 'react'
import { TelegramUserData } from 'types/user'

interface Popup {
  window: Window | null
  authFinished: boolean
}

export class TelegramWidget {
  public popup: Popup
  private bot_id: string
  private widgetsOrigin: string
  private request_access = true

  constructor(bot_id: string, requestAccess: boolean) {
    this.popup = {
      window: null,
      authFinished: false
    }
    this.bot_id = bot_id
    this.request_access = requestAccess
    this.widgetsOrigin = 'https://oauth.telegram.org'
  }

  auth(
    callback: (user: TelegramUserData) => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setLoading(true)

    const width = 550
    const height = 470
    const left = Math.max(0, (screen.width - width) / 2)
    const top = Math.max(0, (screen.height - height) / 2)

    const popup_url = this.widgetsOrigin + '/auth?bot_id=' + encodeURIComponent(this.bot_id) + '&origin=' + encodeURIComponent(location.origin || location.protocol + '//' + location.hostname) + (this.request_access ? '&request_access=' + encodeURIComponent(this.request_access) : '')
    const popup = window.open(popup_url, 'telegram_oauth_bot' + this.bot_id, 'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',status=0,location=0,menubar=0,toolbar=0')

    this.popup = {
      window: popup,
      authFinished: false
    }

    const onMessage = (event: MessageEvent) => {
      let data

      try {
        data = JSON.parse(event.data)
      } catch (e) {
        data = {}
      }

      if (event.source !== this.popup.window) return
      if (data.event === 'auth_result') {
        onAuthDone(data.result)
      }
    }

    const onAuthDone = (userData: TelegramUserData) => {
      if (this.popup.authFinished) return
      if (userData?.auth_date) callback(userData)
      this.popup.authFinished = true
      window.removeEventListener('message', onMessage)
    }

    const checkClose = () => {
      if (!this.popup.window || this.popup.window.closed) {
        setLoading(false)
        return this.getAuthData(onAuthDone)
      }
      setTimeout(checkClose, 100, this.bot_id)
    }

    if (popup) {
      window.addEventListener('message', onMessage)
      popup.focus()
      checkClose()
    }
  }

  private async getAuthData(
    callback: (userData: TelegramUserData) => void
  ) {
    try {
      const url = this.widgetsOrigin + '/auth/get'
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: new URLSearchParams({ bot_id: this.bot_id })
      })

      const body = await response.json()
      callback(body)
    } catch (err) {
      console.error(err)
    }
  }
}
