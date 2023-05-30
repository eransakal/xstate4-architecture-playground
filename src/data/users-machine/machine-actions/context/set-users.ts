import { assign } from '@xstate/immer';
import { createUsersMachineLogger } from '../../utils/logger';
import { UsersMachineContext, UsersMachineEvents } from '../../types';

const logger = createUsersMachineLogger('Update Users Information');

export const setUsers = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (event.type !== 'done.invoke.getUsers') {
      return undefined;
    }

    logger.log(`store users information`);

    context.ownUser = event.data.ownUser;
    context.users = event.data.users;
  }
);
