import { UserApiResponse } from 'types/user'

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user: UserApiResponse
  }
}
