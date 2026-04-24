export type UserStatus = 'online' | 'away' | 'offline'

export type User = {
  id: number;
  name: string;
  status: UserStatus;
}

export type Message = {
  id: string;
  authorId: number;
  authorName: string;
  text: string;
  timestamp: string;
  own?: boolean;
}

export type ServerClient = {
  id: number;
  name: string;
}

export type ServerEvent =
  | {
      type: 'welcome';
      client: ServerClient;
      clients: ServerClient[];
      onlineCount: number;
    }
  | {
      type: 'presence';
      action: 'joined' | 'left' | 'updated';
      client: ServerClient;
      onlineCount: number;
    }
  | {
      type: 'chat_message';
      client: ServerClient;
      text: string;
      sentAt: string;
    }
  | {
      type: 'profile';
      client: ServerClient;
    }
  | {
      type: 'error';
      message: string;
    }
