import { InterpreterFrom, Sender, State, StateMachine } from 'xstate';
import { StateNodeConfig } from 'xstate/lib/types';
import { UpdateUserRoleMachineContext } from './context';
import { UpdateUserRoleMachineEvents } from './events';

export * from './events';
export * from './context';

export const UpdateUserRoleMachineId = 'updateUserRole';

// Those types are always the same, don't manually modify their declarations.
export type UpdateUserRoleMachine = StateMachine<
  UpdateUserRoleMachineContext,
  any,
  UpdateUserRoleMachineEvents,
  any
>;
export type UpdateUserRoleMachineService =
  InterpreterFrom<UpdateUserRoleMachine>;
export type UpdateUserRoleMachineSender = Sender<UpdateUserRoleMachineEvents>;
export type UpdateUserRoleMachineState = State<
  UpdateUserRoleMachineContext,
  UpdateUserRoleMachineEvents
>;
export type UpdateUserRoleMachineStateConfig = StateNodeConfig<
  UpdateUserRoleMachineContext,
  any,
  UpdateUserRoleMachineEvents,
  any
>;
