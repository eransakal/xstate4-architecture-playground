import React from "react";
import { UserPolls2MachineService } from "../types";


export const UserPolls2Context = React.createContext<{
    userPolls2MachineService: UserPolls2MachineService;
  }>(null as any);