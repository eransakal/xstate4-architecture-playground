import { useContext, useEffect, useRef } from 'react';
import { UserPolls2Context } from './user-polls2-context';
import { UserPolls2MachineState } from '../types';
import { GlobalEvent } from '../../../shared/pubsub/global-event';
import { useSelector } from '@xstate/react';

import { createUserPolls2MachineLogger } from './logger';

const logger =  createUserPolls2MachineLogger(
    'MachineGlobalEventEmitter'
  );

export interface Props<TValue> {
  name: string;
  selector: (state: UserPolls2MachineState) => TValue;
  event: GlobalEvent<TValue>;
  emitWithContext?: string;
}

export function MachineGlobalEventEmitter<T>(props: Props<T>) {
  
  const { userPolls2MachineService } = useContext(UserPolls2Context);

  const eventRef = useRef(props.event);
  eventRef.current = props.event;
  
  const value = useSelector(userPolls2MachineService, props.selector);
  useEffect(() => {
    logger.log(`emitting global event update for '${props.name}'`);    
    if (props.emitWithContext) {
      props.event.emitByContext(props.emitWithContext, value);
    } else {
      props.event.emit(value);
    }
  }, [value, userPolls2MachineService, props.name, props.emitWithContext, props.event]);

  useEffect(() => {
    return () => {
      props.event.resetLastValue();
    }
  }, [props.event]);

  return null;
}
