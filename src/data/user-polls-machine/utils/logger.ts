import { UserPollsMachineId } from '../types';

export const createUserPollsMachineLogger = (
  sender: string
) => ({
  log: ({ message, data }: { message: string, data?: Record<string, any>}) =>{
    if (data) {
      console.log(`[${ UserPollsMachineId }:${sender}] ${message}`, data)
      return
    }
    console.log(`[${ UserPollsMachineId }:${sender}] ${message}`)
  },
  warn: ({ message, data }: { message: string, data?: Record<string, any>}) =>{
    if (data) {
      console.warn(`[${ UserPollsMachineId }:${sender}] ${message}`, data)
      return
    }
    console.warn(`[${ UserPollsMachineId }:${sender}] ${message}`)
  },
  error: ({ message, data }: { message: string, data?: Record<string, any>}) =>{
    if (data) {
      console.error(`[${ UserPollsMachineId }:${sender}] ${message}`, data)
      return
    }
    console.error(`[${ UserPollsMachineId }:${sender}] ${message}`)
  }
})
