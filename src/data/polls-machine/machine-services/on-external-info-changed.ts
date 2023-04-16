import { onOwnUserChangedEvent } from '../../users-machine/global-events';
import { User } from '../../users-machine/types';
import {
  PollsMachineContext,
  PollsMachineEventsTypes,
  PollsMachineSender,
} from '../types';

// const logger = createPollsMachineLogger('onExternalInfoChanged');

export const onExternalInfoChanged =
  (context: PollsMachineContext, data: any) => (send: PollsMachineSender) => {
    const handleOwnUserChanged = (ownUser: User) => {
      send({
        type: PollsMachineEventsTypes.ExternalInfoUpdated,
        externalInfo: {
          userId: ownUser.id,
          isAdmin: ownUser.isAdmin,
        },
      });
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
