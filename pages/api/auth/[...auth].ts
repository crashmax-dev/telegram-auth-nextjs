import mongodb from 'lib/mongodb'
import TelegramAuth from 'lib/middleware'

export default TelegramAuth({
  database: mongodb
})