import { UsersMachineStateConfig } from '../../types';
export const bootUpState: UsersMachineStateConfig = {
  invoke: {
    src: 'getUsers',
    onDone: {
      actions: ['setUsers', 'emitOwnUserUpdated'],
      target: 'operating',
    },
  },
};
