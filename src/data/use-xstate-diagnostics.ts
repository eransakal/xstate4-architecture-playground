import { useEffect } from 'react'
import { Interpreter } from 'xstate';

export const useXStateDiagnostics = (
    { logger, service} : {logger: any, service: Interpreter<any, any, any, any, any>; }
  ) => {
useEffect(() => {
    const { unsubscribe } = service.subscribe((newState) => {
      const eventType = newState.event.type;

      let message = `The event '${eventType}' was triggered.`;
      const state = newState.changed ? newState.value : undefined;

      if (state) {
        message += ` The state was changed as a result of this event.`;
      }

      const data = {
        context: (newState.context),
        event: newState.event,
        state,
      };

      logger.log(message,data);
    });
    return () => {
      unsubscribe();
    };
  }, [service, logger]);
};