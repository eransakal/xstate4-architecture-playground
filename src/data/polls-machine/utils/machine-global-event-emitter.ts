import React, { useContext, useEffect } from 'react';
import { PollsContext } from './polls-context';
import { createPollsMachineLogger } from './logger';
import { PollsMachineState } from '../types';
import { GlobalEvent } from '../../../shared/pubsub/global-event';

export interface Props<TValue> {
  name: string;
  selector: (state: PollsMachineState) => TValue;
  event: GlobalEvent<TValue>;
  emitWithContext?: string;
}
const logger = createPollsMachineLogger('globalEventEmitter');
export function MachineGlobalEventEmitter<T>(props: Props<T>) {
  const { pollsMachineService } = useContext(PollsContext);
  const prefValueRef = React.useRef<any>(undefined);

  useEffect(() => {
    logger.log(
      `waiting for '${props.name}' changes to emit ${
        props.emitWithContext
          ? ` (event context '${props.emitWithContext}')`
          : ''
      }`
    );
    const sub = pollsMachineService.subscribe((state) => {
      const value = props.selector(state);
      if (!!value && value !== prefValueRef.current) {
        logger.log(`emitting global event update for '${props.name}'`);
        prefValueRef.current = value;
        if (props.emitWithContext) {
          props.event.emitByContext(props.emitWithContext, value);
        } else {
          props.event.emit(value);
        }
      }
    });
    return () => {
      logger.log(
        `stop waiting for '${props.name}' changes to emit ${
          props.emitWithContext
            ? ` (event context '${props.emitWithContext}')`
            : ''
        }`
      );
      sub.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pollsMachineService,
    props.name,
    props.selector,
    props.event,
    props.emitWithContext,
  ]);

  return null;
}
