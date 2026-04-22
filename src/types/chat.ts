export type UserStatus = 'online' | 'away' | 'offline'

export interface User {
  id: number
  name: string
  status: UserStatus
}

export interface Message {
  id: number
  author: string
  text: string
  time: string
  own?: boolean
}
