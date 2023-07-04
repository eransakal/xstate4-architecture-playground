export type UserPollsNotification = {
  variant: 'error' | 'warning' | 'info' | 'success';
  message: string;
  payload?: Record<string, any>;
  id: string;
};