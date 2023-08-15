import { Challenge } from 'entities/Challenge/types/ChallengeScheme';
export interface TaskTrackerScheme {
  showCompleted?: boolean;
  challengeData: ChallengeData;
  selectedTag: string;
  description: string;
  difficulty: number;
  isLoading: boolean;
  title: string;
  isDone: boolean;
  habits?: [];
  tasks?: [];
  tags: string[];
  id: string;
  error: string;
}
export interface ChallengeData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  executionType: string;
  points: number;
  participants: string[];
  communityID?: string;
}
