import { User, onOwnUserChangedEvent } from '../../users-machine';
import {
  UserPolls2MachineContext,
  UserPolls2MachineSender,
  UserPolls2MachineEventsTypes
} from '../types';

import { createUserPolls2MachineLogger } from '../utils/logger';

const logger =  createUserPolls2MachineLogger(
    'onExternalInfoUpdated'
  );

// TODO add link to reference
export const onExternalInfoUpdated =
  (context: UserPolls2MachineContext, data: any) => (send: UserPolls2MachineSender) => {
    const handleOwnUserChanged = (ownUser: User | null) => {
  
      if (ownUser) {
        logger.log(`updating external info for user '${ownUser.id}'`)
        send({
          type: UserPolls2MachineEventsTypes.ExternalInfoUpdated,
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
