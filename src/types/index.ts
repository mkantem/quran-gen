export interface ReadingPlan {
  id: string;
  bookType: 'quran' | 'custom';
  bookName?: string;
  totalPages: number;
  participants: Participant[];
  startDate: string;
  endDate: string;
  createdBy: string;
  status: 'active' | 'completed' | 'archived';
  progress: number;
}

export interface Participant {
  id: string;
  name: string;
  startPage: number;
  endPage: number;
  pagesPerDay: number;
  progress: number;
}

export interface DailyProgress {
  date: string;
  pagesRead: number;
  participantId: string;
  planId: string;
}