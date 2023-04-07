import { PollsMachineContext } from './context';

export enum PollsMachineEventsTypes {
  ExternalInfoUpdated = 'ExternalInfoUpdated',
  CreateAPoll = 'CreateAPoll',
  EndPoll = 'EndPoll',
  PollStarted = 'PollStarted',
  PollEnded = 'PollEnded',
  PollAnswered = 'PollAnswered',
  AnswerPoll = 'AnswerPoll',
}

type invokeEvents = {
  type: 'done.invoke.polls.core.bootUp.loadPollData.inProgress:invocation[0]';
  data: null | {
    isPrivate: boolean;
    pollType: string;
    pollCreator: number;
    answers: {
      userId: number;
      userName: string;
      userAvatar: string | null;
      answerId: string;
    }[];
  };
};

export type PollsMachineEvents =
  | invokeEvents
  | {
      type: PollsMachineEventsTypes.ExternalInfoUpdated;
      externalInfo: Partial<PollsMachineContext['externalInfo']>;
    }
  | {
      type: PollsMachineEventsTypes.CreateAPoll;
      pollType: string;
      isPrivate: boolean;
    }
  | {
      type: PollsMachineEventsTypes.PollStarted;
      isPrivate: boolean;
      pollCreator: number;
      pollType: string;
    }
  | {
      type: PollsMachineEventsTypes.PollEnded;
    }
  | {
      type: PollsMachineEventsTypes.EndPoll;
    }
  | {
      type: PollsMachineEventsTypes.AnswerPoll;
      answerId: string;
    }
  | {
      type: PollsMachineEventsTypes.PollAnswered;
      userId: number;
      answerId: string;
      userName: string;
      userAvatar: string | null;
    };
