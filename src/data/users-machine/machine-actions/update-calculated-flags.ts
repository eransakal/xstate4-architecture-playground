import { actions } from 'xstate';
import { UsersMachineContext } from '../types';

export const updateCalculatedFlags = actions.pure(
  (context: UsersMachineContext, _: unknown) => {
    console.log('updateCalculatedFlags', context);
    return undefined;
  }
);
