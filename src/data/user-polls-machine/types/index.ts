import { InterpreterFrom, Sender, State, StateMachine } from 'xstate';  
import { StateNodeConfig } from 'xstate/lib/types';  
import { UserPollsMachineContext } from './context';
import { UserPollsMachineEvents } from './events';

export * from './events';
export * from './context';
export * from './notifications';

export const UserPollsMachineId = 'userPolls';

// Notice: Those types are always the same, don't manually modify the declarations.
export type UserPollsMachine = StateMachine<
  UserPollsMachineContext,
  any,
  UserPollsMachineEvents,
  any
>;
export type UserPollsMachineService = InterpreterFrom<UserPollsMachine>;
export type UserPollsMachineSender = Sender<UserPollsMachineEvents>;
export type UserPollsMachineState = State<
  UserPollsMachineContext,
  UserPollsMachineEvents,
  any,
  any,
  any
>;
export type UserPollsMachineStateConfig = StateNodeConfig<
  UserPollsMachineContext,
  any,
  UserPollsMachineEvents,
  any
>;
