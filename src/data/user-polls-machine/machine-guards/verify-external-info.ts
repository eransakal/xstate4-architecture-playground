import { externalInfoLoaded } from '../calculated-value/external-info-loaded';
import { UserPollsMachineContext } from '../types';

export const onExternalInfoLoaded = (context: UserPollsMachineContext) =>
  {
    return externalInfoLoaded(context);
  }
