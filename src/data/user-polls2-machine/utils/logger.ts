import { UserPolls2MachineId } from '../types';
export const createUserPolls2MachineLogger = (
  sender: string
) => ({
  log: (message: string, ...optionalParams: any[]) =>{
    console.log(`[${ UserPolls2MachineId }:${sender}] ${message}`, ...optionalParams)
  },
  warn: (message: string, ...optionalParams: any[]) =>{
    console.warn(`[${ UserPolls2MachineId }:${sender}] ${message}`, ...optionalParams)
  },
  error: (message: string, ...optionalParams: any[]) =>{
    console.error(`[${ UserPolls2MachineId }:${sender}] ${message}`, ...optionalParams)
  }
})
