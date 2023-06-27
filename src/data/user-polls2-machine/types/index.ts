import { InterpreterFrom, Sender, State, StateMachine } from 'xstate';  
import { StateNodeConfig } from 'xstate/lib/types';  
import { UserPolls2MachineContext } from './context';
import { UserPolls2MachineEvents } from './events';

export * from './events';
export * from './context';

export const UserPolls2MachineId = 'userPolls2';

// Notice: Those types are always the same, don't manually modify the declarations.
export type UserPolls2Machine = StateMachine<
  UserPolls2MachineContext,
  any,
  UserPolls2MachineEvents,
  any
>;
export type UserPolls2MachineService = InterpreterFrom<UserPolls2Machine>;
export type UserPolls2MachineSender = Sender<UserPolls2MachineEvents>;
export type UserPolls2MachineState = State<
  UserPolls2MachineContext,
  UserPolls2MachineEvents,
  any,
  any,
  any
>;
export type UserPolls2MachineStateConfig = StateNodeConfig<
  UserPolls2MachineContext,
  any,
  UserPolls2MachineEvents,
  any
>;
