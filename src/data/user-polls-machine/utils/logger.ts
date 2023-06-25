import { UserPollsMachineId } from '../types';
export const createUserPollsMachineLogger = (
  sender: string
) => ({
  log: (message: string, ...optionalParams: any[]) =>{
    console.log(`[${ UserPollsMachineId }:${sender}] ${message}`, ...optionalParams)
  },
  warn: (message: string, ...optionalParams: any[]) =>{
    console.warn(`[${ UserPollsMachineId }:${sender}] ${message}`, ...optionalParams)
  },
  error: (message: string, ...optionalParams: any[]) =>{
    console.error(`[${ UserPollsMachineId }:${sender}] ${message}`, ...optionalParams)
  }
})
