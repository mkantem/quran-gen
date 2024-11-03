import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Users, Calendar } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function Home() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                {language === 'en' ? 'Latest updates' : 'Dernières mises à jour'}
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            {language === 'en' ? 'Reading Planner' : 'Planificateur de Lecture'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? 'Organize your group reading sessions efficiently. Perfect for the Quran and other books.'
              : 'Organisez vos sessions de lecture en groupe efficacement. Parfait pour le Coran et autres livres.'}
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={() => navigate('/new-plan')}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {language === 'en' ? 'Get started' : 'Commencer'}
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
            >
              {language === 'en' ? 'View dashboard' : 'Voir le tableau de bord'} <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
                <Book className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Book Management' : 'Gestion des Livres'}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Manage multiple books including the Quran'
                    : 'Gérez plusieurs livres, y compris le Coran'}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
                <Users className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Group Reading' : 'Lecture en Groupe'}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {language === 'en'
                    ? 'Coordinate reading schedules with your group'
                    : 'Coordonnez les horaires de lecture avec votre groupe'}
                </p>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
                <Calendar className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Progress Tracking' : 'Suivi des Progrès'}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {language === 'en'
                    ? 'Track reading progress and stay on schedule'
                    : 'Suivez les progrès de lecture et respectez le programme'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}