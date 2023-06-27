import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { UserPolls2Context } from './user-polls2-context';
import { UserPolls2MachineContext, UserPolls2MachineEvents, UserPolls2MachineState } from '../types';
import { useSelector } from '@xstate/react';

import { createUserPolls2MachineLogger } from './logger';

const logger =  createUserPolls2MachineLogger(
    'MachineCalculatedValueEmitter'
  );

export interface Props<TValue> {  
  formula: (context: UserPolls2MachineContext) => TValue;
  event: (value: TValue) => UserPolls2MachineEvents  
}

export function MachineCalculatedValueEmitter<T>(props: Props<T>) {
  const { userPolls2MachineService } = useContext(UserPolls2Context);

  const eventRef = useRef(props.event);
  eventRef.current = props.event;

  const formula = props?.formula;
  const selector = useMemo(() => {
    return (state: UserPolls2MachineState) => {
      return formula?.(state.context);
    }
  }, [formula]);
  
  const value = useSelector(userPolls2MachineService, selector);
  useEffect(() => {
    if (eventRef.current) {
      const event = eventRef.current(value)
      if (event) {
        logger.log(`emitting calculated value changed event '${event.type}'`);
        console.log(event)
        userPolls2MachineService.send(event)
      }
    }
  }, [value, userPolls2MachineService]);

  return null;
}
