import { InterpreterFrom, Sender, State, StateMachine } from 'xstate';
import { StateNodeConfig } from 'xstate/lib/types';
import { UpdateUserStatusMachineContext } from './context';
import { UpdateUserStatusMachineEvents } from './events';

export * from './events';
export * from './context';

export const UpdateUserStatusMachineId = 'updateUserStatus';

// Those types are always the same, don't manually modify their declarations.
export type UpdateUserStatusMachine = StateMachine<
  UpdateUserStatusMachineContext,
  any,
  UpdateUserStatusMachineEvents,
  any
>;
export type UpdateUserStatusMachineService =
  InterpreterFrom<UpdateUserStatusMachine>;
export type UpdateUserStatusMachineSender =
  Sender<UpdateUserStatusMachineEvents>;
export type UpdateUserStatusMachineState = State<
  UpdateUserStatusMachineContext,
  UpdateUserStatusMachineEvents
>;
export type UpdateUserStatusMachineStateConfig = StateNodeConfig<
  UpdateUserStatusMachineContext,
  any,
  UpdateUserStatusMachineEvents,
  any
>;
