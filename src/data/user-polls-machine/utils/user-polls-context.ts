import React from "react";
import { UserPollsMachineService } from "../types";


export const UserPollsContext = React.createContext<{
    userPollsMachineService: UserPollsMachineService;
  }>(null as any);