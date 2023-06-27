import { useContext } from 'react';
import { useSelector } from '@xstate/react';
import { UserPolls2MachineState } from './types';
import { UserPolls2Context } from './utils/user-polls2-context';

// Notice: This file was auto-generated, don't manually modify its content.
type UserPolls2Selectors<
  T extends
    | Record<string, (state: UserPolls2MachineState) => any>
    | ((state: UserPolls2MachineState) => any)
> = T extends Record<string, (state: UserPolls2MachineState) => any>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : T extends (state: UserPolls2MachineState) => any
  ? ReturnType<T>
  : unknown;

export const useUserPolls2Updates = <
  T extends
    | Record<string, (state: UserPolls2MachineState) => any>
    | ((state: UserPolls2MachineState) => any)
>(
  selectors: T
): UserPolls2Selectors<T> => {  
  const { userPolls2MachineService } = useContext(UserPolls2Context);

  let selector: (state: UserPolls2MachineState) => any = () => {};

  if (typeof selectors === 'function') {
    selector = selectors;
  } else if (typeof selectors === 'object') {
    selector = (state: UserPolls2MachineState) => {
      const result: Partial<UserPolls2Selectors<T>> = {};

      for (const key in selectors) {
        if (Object.prototype.hasOwnProperty.call(selectors, key)) {
          result[key] = (selectors[key] as any)(state);
        }
      }

      return result as UserPolls2Selectors<T>;
    };
  }

  return useSelector(userPolls2MachineService, selector) as UserPolls2Selectors<T>;
};
