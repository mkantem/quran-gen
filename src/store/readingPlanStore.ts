import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReadingPlan, Participant } from '../types';
import { addDays, format } from 'date-fns';

interface ReadingPlanStore {
  plans: ReadingPlan[];
  createPlan: (data: {
    bookType: 'quran' | 'custom';
    bookName?: string;
    totalPages: number;
    participantNames: string[];
    days: number;
    userId: string;
  }) => ReadingPlan;
  updateProgress: (planId: string, participantId: string, pagesRead: number) => void;
  archivePlan: (planId: string) => void;
  deletePlan: (planId: string) => void;
}

export const useReadingPlanStore = create<ReadingPlanStore>()(
  persist(
    (set) => ({
      plans: [],
      createPlan: (data) => {
        const pagesPerParticipant = Math.floor(data.totalPages / data.participantNames.length);
        const startDate = new Date();
        const endDate = addDays(startDate, data.days);

        const participants: Participant[] = data.participantNames.map((name, index) => {
          const startPage = index * pagesPerParticipant + 1;
          const endPage = index === data.participantNames.length - 1
            ? data.totalPages
            : (index + 1) * pagesPerParticipant;

          return {
            id: crypto.randomUUID(),
            name,
            startPage,
            endPage,
            pagesPerDay: Math.ceil((endPage - startPage + 1) / data.days),
            progress: 0,
          };
        });

        const newPlan: ReadingPlan = {
          id: crypto.randomUUID(),
          bookType: data.bookType,
          bookName: data.bookName,
          totalPages: data.totalPages,
          participants,
          startDate: format(startDate, 'yyyy-MM-dd'),
          endDate: format(endDate, 'yyyy-MM-dd'),
          createdBy: data.userId,
          status: 'active',
          progress: 0,
        };

        set((state) => ({
          plans: [...state.plans, newPlan],
        }));

        return newPlan;
      },
      updateProgress: (planId, participantId, pagesRead) => {
        set((state) => ({
          plans: state.plans.map((plan) => {
            if (plan.id !== planId) return plan;

            const updatedParticipants = plan.participants.map((participant) => {
              if (participant.id !== participantId) return participant;

              const totalPages = participant.endPage - participant.startPage + 1;
              const newProgress = Math.min(100, (pagesRead / totalPages) * 100);

              return {
                ...participant,
                progress: newProgress,
              };
            });

            const overallProgress = updatedParticipants.reduce(
              (acc, curr) => acc + curr.progress,
              0
            ) / updatedParticipants.length;

            return {
              ...plan,
              participants: updatedParticipants,
              progress: overallProgress,
              status: overallProgress === 100 ? 'completed' : plan.status,
            };
          }),
        }));
      },
      archivePlan: (planId) => {
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === planId ? { ...plan, status: 'archived' } : plan
          ),
        }));
      },
      deletePlan: (planId) => {
        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== planId),
        }));
      },
    }),
    {
      name: 'reading-plan-storage',
    }
  )
);