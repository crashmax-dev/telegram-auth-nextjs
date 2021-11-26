import mongodb from 'lib/mongodb'
import loginRoute from 'lib/login'
import logoutRoute from 'lib/logout'
import sessionRoute from 'lib/session'
import TelegramAuth from 'lib/middleware'

export default TelegramAuth({
  database: mongodb,
  onLogin: async (req, res) => {
    loginRoute(req, res)
  },
  onLogout: async (req, res) => {
    logoutRoute(req, res)
  },
  onSession: async (req, res) => {
    sessionRoute(req, res)
  }
})
