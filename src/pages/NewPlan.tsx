import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useReadingPlanStore } from '../store/readingPlanStore';
import { Plus, X } from 'lucide-react';

const schema = z.object({
  bookType: z.enum(['quran', 'custom']),
  bookName: z.string().min(1, 'Book name is required').optional(),
  totalPages: z.number().min(1, 'Must be at least 1 page'),
  days: z.number().min(1, 'Must be at least 1 day'),
});

type FormData = z.infer<typeof schema>;

export function NewPlan() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const createPlan = useReadingPlanStore((state) => state.createPlan);
  const [participants, setParticipants] = useState<string[]>(['']);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bookType: 'quran',
      totalPages: 602,
      days: 30,
    },
  });

  const bookType = watch('bookType');

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index: number, name: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };

  const onSubmit = (data: FormData) => {
    if (!user) return;

    const filteredParticipants = participants.filter((name) => name.trim() !== '');
    if (filteredParticipants.length === 0) return;

    createPlan({
      ...data,
      participantNames: filteredParticipants,
      userId: user.id,
    });

    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {language === 'en' ? 'Create New Reading Plan' : 'Créer un nouveau plan de lecture'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Book Type' : 'Type de livre'}
          </label>
          <select
            {...register('bookType')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="quran">
              {language === 'en' ? 'Quran (602 pages)' : 'Coran (602 pages)'}
            </option>
            <option value="custom">
              {language === 'en' ? 'Custom Book' : 'Livre personnalisé'}
            </option>
          </select>
        </div>

        {bookType === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === 'en' ? 'Book Name' : 'Nom du livre'}
            </label>
            <input
              type="text"
              {...register('bookName')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.bookName && (
              <p className="mt-1 text-sm text-red-600">{errors.bookName.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Total Pages' : 'Nombre total de pages'}
          </label>
          <input
            type="number"
            {...register('totalPages', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.totalPages && (
            <p className="mt-1 text-sm text-red-600">{errors.totalPages.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Days to Complete' : 'Jours pour compléter'}
          </label>
          <input
            type="number"
            {...register('days', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.days && (
            <p className="mt-1 text-sm text-red-600">{errors.days.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Participants' : 'Participants'}
          </label>
          <div className="mt-2 space-y-3">
            {participants.map((participant, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={participant}
                  onChange={(e) => updateParticipant(index, e.target.value)}
                  placeholder={
                    language === 'en'
                      ? `Participant ${index + 1}`
                      : `Participant ${index + 1}`
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParticipant(index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addParticipant}
            className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            {language === 'en' ? 'Add Participant' : 'Ajouter un participant'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {language === 'en' ? 'Create Plan' : 'Créer le plan'}
        </button>
      </form>
    </div>
  );
}