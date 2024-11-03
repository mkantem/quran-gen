import React from 'react';
import { ReadingPlan } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { Archive, Trash2, Users } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface PlanCardProps {
  plan: ReadingPlan;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function PlanCard({ plan, onArchive, onDelete }: PlanCardProps) {
  const { language } = useLanguage();
  const daysLeft = differenceInDays(new Date(plan.endDate), new Date());

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {plan.bookType === 'quran' 
              ? language === 'en' ? 'Quran Reading' : 'Lecture du Coran'
              : plan.bookName}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {language === 'en' ? 'Created on' : 'Créé le'}{' '}
            {format(new Date(plan.startDate), 'PP')}
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onArchive(plan.id)}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <Archive className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="p-2 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Users className="h-4 w-4 mr-1" />
          {plan.participants.length}{' '}
          {language === 'en' ? 'participants' : 'participants'}
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{language === 'en' ? 'Progress' : 'Progrès'}</span>
            <span>{Math.round(plan.progress)}%</span>
          </div>
          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${plan.progress}%` }}
            />
          </div>
        </div>
        <div className="mt-4 text-sm">
          {daysLeft > 0 ? (
            <span className="text-green-600 dark:text-green-400">
              {language === 'en' 
                ? `${daysLeft} days remaining`
                : `${daysLeft} jours restants`}
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">
              {language === 'en' ? 'Plan ended' : 'Plan terminé'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}