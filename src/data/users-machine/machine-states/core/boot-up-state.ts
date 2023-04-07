import { UsersMachineStateConfig } from '../../types';
export const bootUpState: UsersMachineStateConfig = {
  invoke: {
    src: 'getUsersInformation',
    onDone: {
      actions: ['updateUsersInformation', 'emitIsAdminChanged'],
      target: 'operating',
    },
  },
};
