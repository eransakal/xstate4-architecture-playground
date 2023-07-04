import { useContext, useState } from 'react';
import { useSelector } from '@xstate/react';
import { UserPollsMachineState } from './types';
import { UserPollsContext } from './utils/user-polls-context';

// Notice: This file was auto-generated, don't manually modify its content.
type UserPollsSelectors<
  T extends
    | Record<string, (state: UserPollsMachineState) => any>
    | ((state: UserPollsMachineState) => any)
> = T extends Record<string, (state: UserPollsMachineState) => any>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : T extends (state: UserPollsMachineState) => any
  ? ReturnType<T>
  : unknown;

export const useUserPollsUpdates = <
  T extends
    | Record<string, (state: UserPollsMachineState) => any>
    | ((state: UserPollsMachineState) => any)
>(
  selectors: T
): UserPollsSelectors<T> => {  
  const { userPollsMachineService: machineService } = useContext(UserPollsContext);

  const getSelectorFn: () => ((state: UserPollsMachineState) => any) = ()  => {
    if (typeof selectors === 'function') {
      return selectors;
    } else if (typeof selectors === 'object') {
      return (state: UserPollsMachineState) => {
        const result: Partial<UserPollsSelectors<T>> = {};

        for (const key in selectors) {
          if (Object.prototype.hasOwnProperty.call(selectors, key)) {
            result[key] = (selectors[key] as any)(state);
          }
        }

        return result as UserPollsSelectors<T>;
      };
    }

    return () => null;
  }
  const [selectorFn] = useState<(state: UserPollsMachineState) => any>(() => getSelectorFn())

  return useSelector(machineService, selectorFn) as UserPollsSelectors<T>;
};
