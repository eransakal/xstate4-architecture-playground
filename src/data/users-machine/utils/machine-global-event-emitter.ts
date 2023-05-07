import React, { useContext, useEffect } from 'react';
import { UsersContext } from './users-context';
import { createUsersMachineLogger } from './logger';
import { UsersMachineState } from '../types';
import { GlobalEvent } from '../../../shared/pubsub/global-event';

export interface Props<TValue> {
  name: string;
  selector: (state: UsersMachineState) => TValue;
  event: GlobalEvent<TValue>;
  emitWithContext?: string;
}
const logger = createUsersMachineLogger('globalEventEmitter');
export function MachineGlobalEventEmitter<T>(props: Props<T>) {
  const { usersMachineService } = useContext(UsersContext);
  const prefValueRef = React.useRef<any>(undefined);

  useEffect(() => {
    logger.log(
      `subscribing from global event '${props.name}' (event context '${props.emitWithContext}')`
    );
    const sub = usersMachineService.subscribe((state) => {
      const value = props.selector(state);
      if (!!value && value !== prefValueRef.current) {
        logger.log(`broadcasting global event for '${props.name}'`);
        prefValueRef.current = value;
        if (props.emitWithContext) {
          props.event.emitByApp(props.emitWithContext, value);
        } else {
          props.event.emit(value);
        }
      }
    });
    return () => {
      logger.log(
        `unsubscribing from global event '${props.name}' (event context '${props.emitWithContext}')`
      );
      sub.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    usersMachineService,
    props.name,
    props.selector,
    props.event,
    props.emitWithContext,
  ]);

  return null;
}
