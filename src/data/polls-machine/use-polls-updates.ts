import { useSelector } from '@xstate/react';
import { PollsMachineState } from './types';
import { useContext } from 'react';
import { PollsContext } from './utils/polls-context';

type PollsSelectors<
  T extends
    | Record<string, (state: PollsMachineState) => any>
    | ((state: PollsMachineState) => any)
> = T extends Record<string, (state: PollsMachineState) => any>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : T extends (state: PollsMachineState) => any
  ? ReturnType<T>
  : unknown;

export const useUserPollsUpdates = <
  T extends
    | Record<string, (state: PollsMachineState) => any>
    | ((state: PollsMachineState) => any)
>(
  selectors: T
): PollsSelectors<T> => {
  const { pollsMachineService } = useContext(PollsContext);

  let selector: (state: PollsMachineState) => any = () => {};

  if (typeof selectors === 'function') {
    selector = selectors;
  } else if (typeof selectors === 'object') {
    selector = (state: PollsMachineState) => {
      const result: Partial<PollsSelectors<T>> = {};

      for (const key in selectors) {
        if (Object.prototype.hasOwnProperty.call(selectors, key)) {
          result[key] = (selectors[key] as any)(state);
        }
      }

      return result as PollsSelectors<T>;
    };
  }

  return useSelector(pollsMachineService, selector) as PollsSelectors<T>;
};
