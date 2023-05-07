import React from 'react';
import { UsersMachineService } from '../types';

export const UsersContext = React.createContext<{
  usersMachineService: UsersMachineService;
}>(null as any);
