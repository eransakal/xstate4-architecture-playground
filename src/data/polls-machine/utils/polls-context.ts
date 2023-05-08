import React from "react";
import { PollsMachineService } from "../types";


export const PollsContext = React.createContext<{
    pollsMachineService: PollsMachineService;
  }>(null as any);