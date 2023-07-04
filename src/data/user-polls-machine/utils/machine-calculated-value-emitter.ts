import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { UserPollsContext } from './user-polls-context';
import { UserPollsMachineContext, UserPollsMachineEvents, UserPollsMachineState } from '../types';
import { useSelector } from '@xstate/react';

import { createUserPollsMachineLogger } from './logger';

const logger =  createUserPollsMachineLogger(
    'MachineCalculatedValueEmitter'
  );

export interface Props<TValue> {  
  formula: (context: UserPollsMachineContext) => TValue;
  event: (value: TValue) => UserPollsMachineEvents  
}

export function MachineCalculatedValueEmitter<T>(props: Props<T>) {
  const { userPollsMachineService } = useContext(UserPollsContext);

  const eventRef = useRef(props.event);
  eventRef.current = props.event;

  const formula = props?.formula;
  const selector = useMemo(() => {
    return (state: UserPollsMachineState) => {
      return formula?.(state.context);
    }
  }, [formula]);
  
  const value = useSelector(userPollsMachineService, selector);
  useEffect(() => {
    if (eventRef.current) {
      const event = eventRef.current(value)
      if (event) {
        logger.log({
          message: `emitting calculated value changed event '${event.type}'`
        });      
        userPollsMachineService.send(event)
      }
    }
  }, [value, userPollsMachineService]);

  return null;
}
