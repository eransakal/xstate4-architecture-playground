import { User, onOwnUserChangedEvent } from '../../users-machine';
import {
  UserPollsMachineContext,
  UserPollsMachineSender,
  UserPollsMachineEventsTypes
} from '../types';

import { createUserPollsMachineLogger } from '../utils/logger';

const logger =  createUserPollsMachineLogger(
    'onExternalInfoUpdated'
  );

// TODO add link to reference
export const onExternalInfoUpdated =
  (context: UserPollsMachineContext, data: any) => (send: UserPollsMachineSender) => {
    const handleOwnUserChanged = (ownUser: User | null) => {
  
      if (ownUser) {
        logger.log(`updating external info for user '${ownUser.id}'`)
        send({
          type: UserPollsMachineEventsTypes.ExternalInfoUpdated,
          externalInfo: {
            isAdmin: ownUser.isAdmin,
            userId: ownUser.id,
          },
        });
      }
    };

    onOwnUserChangedEvent.on(
      handleOwnUserChanged,
      data.emitLastValue ?? false,
      context.__mockServerInfo__.appInstance
    );
    
    return () => {
      onOwnUserChangedEvent.off(handleOwnUserChanged);
    };
  };
