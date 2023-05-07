import { useSelector } from '@xstate/react';
import { UsersMachineState } from './types';
import { useUsersService } from './use-users-service';
import { useContext } from 'react';
import { UsersContext } from './utils/users-context';

type UsersSelectors<
  T extends
    | Record<string, (state: UsersMachineState) => any>
    | ((state: UsersMachineState) => any)
> = T extends Record<string, (state: UsersMachineState) => any>
  ? { [K in keyof T]: ReturnType<T[K]> }
  : T extends (state: UsersMachineState) => any
  ? ReturnType<T>
  : unknown;

export const useUsersUpdates = <
  T extends
    | Record<string, (state: UsersMachineState) => any>
    | ((state: UsersMachineState) => any)
>(
  selectors: T
): UsersSelectors<T> => {
  const { usersMachineService } = useContext(UsersContext);

  let selector: (state: UsersMachineState) => any = () => {};

  if (typeof selectors === 'function') {
    selector = selectors;
  } else if (typeof selectors === 'object') {
    selector = (state: UsersMachineState) => {
      const result: Partial<UsersSelectors<T>> = {};

      for (const key in selectors) {
        if (Object.prototype.hasOwnProperty.call(selectors, key)) {
          result[key] = (selectors[key] as any)(state);
        }
      }

      return result as UsersSelectors<T>;
    };
  }

  return useSelector(usersMachineService, selector) as UsersSelectors<T>;
};
