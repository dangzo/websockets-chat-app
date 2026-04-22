export type UserStatus = 'online' | 'away' | 'offline'

export type User = {
  id: number;
  name: string;
  status: UserStatus;
}

export type Message = {
  id: number;
  authorId: number;
  text: string;
  timestamp: string;
  own?: boolean;
}
