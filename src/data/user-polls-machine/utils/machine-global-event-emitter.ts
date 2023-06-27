import { useContext, useEffect, useRef } from 'react';
import { UserPollsContext } from './user-polls-context';
import { UserPollsMachineState } from '../types';
import { GlobalEvent } from '../../../shared/pubsub/global-event';
import { useSelector } from '@xstate/react';

import { createUserPollsMachineLogger } from './logger';

const logger =  createUserPollsMachineLogger(
    'MachineGlobalEventEmitter'
  );

export interface Props<TValue> {
  name: string;
  selector: (state: UserPollsMachineState) => TValue;
  event: GlobalEvent<TValue>;
  emitWithContext?: string;
}

export function MachineGlobalEventEmitter<T>(props: Props<T>) {
  
  const { userPollsMachineService } = useContext(UserPollsContext);

  const eventRef = useRef(props.event);
  eventRef.current = props.event;
  
  const value = useSelector(userPollsMachineService, props.selector);
  useEffect(() => {
    logger.log(`emitting global event update for '${props.name}'`);    
    if (props.emitWithContext) {
      props.event.emitByContext(props.emitWithContext, value);
    } else {
      props.event.emit(value);
    }
  }, [value, userPollsMachineService, props.name, props.emitWithContext, props.event]);

  useEffect(() => {
    return () => {
      props.event.resetLastValue();
    }
  }, [props.event]);

  return null;
}
