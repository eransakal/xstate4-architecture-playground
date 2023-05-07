import { UsersMachineId } from '../types';

export const createUsersMachineLogger = (sender: string) => ({
  log: (message: string, context?: Record<string, any>) => {
    console.log(`[${UsersMachineId}:${sender}] ${message}`, context);
  },
  warn: (message: string, context?: Record<string, any>) => {
    console.warn(`[${UsersMachineId}:${sender}] ${message}`, context);
  },
  error: (message: string, context?: Record<string, any>) => {
    console.error(`[${UsersMachineId}:${sender}] ${message}`, context);
  },
});
