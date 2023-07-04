import { useContext, useEffect, useRef } from 'react';
import { UsersContext } from './users-context';
import { createUsersMachineLogger } from './logger';
import { UsersMachineEvents, UsersMachineState } from '../types';
import { useSelector } from '@xstate/react';


export interface Props<TValue> {  
  selector: (state: UsersMachineState) => TValue;
  event: UsersMachineEvents  
}
const logger = createUsersMachineLogger('MachineCalculatedValueEmitter');
export function MachineCalculatedValueEmitter<T>(props: Props<T>) {
  const { usersMachineService } = useContext(UsersContext);

  const eventRef = useRef(props.event);
  eventRef.current = props.event;
  
  const value = useSelector(usersMachineService, props.selector);
  useEffect(() => {
    if (eventRef.current) {
    logger.log(`emitting calculated value changed event '${eventRef.current?.type}'`);
        usersMachineService.send(eventRef.current)
    }
  }, [value, usersMachineService]);

  return null;
}
