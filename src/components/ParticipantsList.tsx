import React from 'react';
import { Participant } from '../types';
import { useLanguage } from '../hooks/useLanguage';

interface ParticipantsListProps {
  participants: Participant[];
  onProgressUpdate: (participantId: string, pagesRead: number) => void;
}

export function ParticipantsList({ participants, onProgressUpdate }: ParticipantsListProps) {
  const { language } = useLanguage();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {language === 'en' ? 'Participants' : 'Participants'}
      </h3>
      <div className="space-y-4">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {participant.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language === 'en' ? 'Pages' : 'Pages'}: {participant.startPage}-
                  {participant.endPage} ({participant.pagesPerDay}{' '}
                  {language === 'en' ? 'pages/day' : 'pages/jour'})
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <label className="sr-only">
                    {language === 'en' ? 'Pages read' : 'Pages lues'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={participant.endPage - participant.startPage + 1}
                    className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder={language === 'en' ? 'Pages' : 'Pages'}
                    onChange={(e) =>
                      onProgressUpdate(participant.id, parseInt(e.target.value, 10))
                    }
                  />
                </div>
                <div className="w-20 text-right">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {Math.round(participant.progress)}%
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${participant.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}