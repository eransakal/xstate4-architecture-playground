import { InterpreterFrom, Sender, State, StateMachine } from 'xstate';  
import { StateNodeConfig } from 'xstate/lib/types';  
import { PollsMachineContext } from './context';
import { PollsMachineEvents } from './events';

export * from './events';
export * from './context';

export const PollsMachineId = 'polls';

// Those types are always the same, don't manually modify their declarations.
export type PollsMachine = StateMachine<
  PollsMachineContext,
  any,
  PollsMachineEvents,
  any
>;
export type PollsMachineService = InterpreterFrom<PollsMachine>;
export type PollsMachineSender = Sender<PollsMachineEvents>;
export type PollsMachineState = State<
  PollsMachineContext,
  PollsMachineEvents,
  any,
  any,
  any
>;
export type PollsMachineStateConfig = StateNodeConfig<
  PollsMachineContext,
  any,
  PollsMachineEvents,
  any
>;
