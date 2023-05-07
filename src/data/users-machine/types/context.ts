export interface User {
  id: number;
  name: string;
  title: string;
  isAdmin: boolean;
  avatar?: string;
  updateStatusRef?: any;
}

export interface UsersMachineContext {
  __mockServerInfo__: {
    appInstance: string;
  }; 
  ownUser: User | null;
  users: User[];
}
