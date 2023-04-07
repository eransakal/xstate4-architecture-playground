import { GlobalEvent } from '../../shared/pubsub/global-event';
import { User } from './types';

export const onOwnUserChangedEvent = new GlobalEvent<User>();
