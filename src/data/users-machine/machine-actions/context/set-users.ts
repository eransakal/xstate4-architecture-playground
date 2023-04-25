import { assign } from '@xstate/immer';
import { createUsersMachineLogger } from '../../logger';
import { UsersMachineContext, UsersMachineEvents } from '../../types';

const logger = createUsersMachineLogger('Update Users Information');

export const setUsers = assign(
  (context: UsersMachineContext, event: UsersMachineEvents) => {
    if (event.type !== 'done.invoke.users.core.bootUp:invocation[0]') {
      return undefined;
    }

    logger.log(`store users information`);

    context.ownUser = event.data.ownUser;
    context.users = event.data.users;
  }
);
