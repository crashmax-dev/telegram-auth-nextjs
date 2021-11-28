import usersRoute from 'lib/routes/users'
import { withSessionRoute } from 'lib/iron-session'

export default withSessionRoute(usersRoute)
