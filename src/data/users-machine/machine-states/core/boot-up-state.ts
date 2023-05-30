import { UsersMachineStateConfig } from '../../types';
export const bootUpState: UsersMachineStateConfig = {
  invoke: {
    id: 'getUsers',
    src: 'getUsers',
    onDone: {
      actions: ['setUsers'],
      target: 'operational',
    },
  },
};
