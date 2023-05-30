import { useContext, useEffect, useRef } from 'react';
import { UsersContext } from './users-context';
import { createUsersMachineLogger } from './logger';
import { UsersMachineState } from '../types';
import { GlobalEvent } from '../../../shared/pubsub/global-event';
import { useSelector } from '@xstate/react';

export interface Props<TValue> {
  name: string;
  selector: (state: UsersMachineState) => TValue;
  event: GlobalEvent<TValue>;
  emitWithContext?: string;
}
const logger = createUsersMachineLogger('MachineGlobalEventEmitter');

export function MachineGlobalEventEmitter<T>(props: Props<T>) {
  
  const { usersMachineService } = useContext(UsersContext);

  const eventRef = useRef(props.event);
  eventRef.current = props.event;
  
  const value = useSelector(usersMachineService, props.selector);
  useEffect(() => {
    logger.log(`emitting global event update for '${props.name}'`);    
    if (props.emitWithContext) {
      props.event.emitByContext(props.emitWithContext, value);
    } else {
      props.event.emit(value);
    }
  }, [value, usersMachineService, props.name, props.emitWithContext, props.event]);

  useEffect(() => {
    return () => {
      props.event.resetLastValue();
    }
  }, [props.event]);

  return null;
}
