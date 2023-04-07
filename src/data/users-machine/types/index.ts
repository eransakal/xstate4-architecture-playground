import { InterpreterFrom, Sender, State, StateMachine } from 'xstate';  
import { StateNodeConfig } from 'xstate/lib/types';  
import { UsersMachineContext } from './context';
import { UsersMachineEvents } from './events';

export * from './events';
export * from './context';

export const UsersMachineId = 'users';

// Those types are always the same, don't manually modify their declarations.
export type UsersMachine = StateMachine<
  UsersMachineContext,
  any,
  UsersMachineEvents,
  any
>;
export type UsersMachineService = InterpreterFrom<UsersMachine>;
export type UsersMachineSender = Sender<UsersMachineEvents>;
export type UsersMachineState = State<
  UsersMachineContext,
  UsersMachineEvents
>;
export type UsersMachineStateConfig = StateNodeConfig<
  UsersMachineContext,
  any,
  UsersMachineEvents,
  any
>;
