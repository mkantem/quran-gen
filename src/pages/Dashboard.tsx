import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../hooks/useAuth';
import { BookOpen, Clock, Plus, Users } from 'lucide-react';
import { useReadingPlanStore } from '../store/readingPlanStore';
import { PlanCard } from '../components/PlanCard';
import { ParticipantsList } from '../components/ParticipantsList';

export function Dashboard() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { plans, updateProgress, archivePlan, deletePlan } = useReadingPlanStore();

  const userPlans = plans.filter((plan) => plan.createdBy === user?.id);
  const activePlans = userPlans.filter((plan) => plan.status === 'active');
  const archivedPlans = userPlans.filter((plan) => plan.status === 'archived');

  const totalParticipants = userPlans.reduce(
    (acc, plan) => acc + plan.participants.length,
    0
  );

  const averageProgress = userPlans.length
    ? userPlans.reduce((acc, plan) => acc + plan.progress, 0) / userPlans.length
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'en' ? 'Dashboard' : 'Tableau de bord'}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {language === 'en' 
              ? `Welcome back, ${user?.name}`
              : `Bienvenue, ${user?.name}`}
          </p>
        </header>
        <button
          onClick={() => navigate('/new-plan')}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          {language === 'en' ? 'New Plan' : 'Nouveau plan'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <h3 className="ml-3 text-xl font-medium text-gray-900 dark:text-white">
              {language === 'en' ? 'Active Plans' : 'Plans actifs'}
            </h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {activePlans.length}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <h3 className="ml-3 text-xl font-medium text-gray-900 dark:text-white">
              {language === 'en' ? 'Total Participants' : 'Participants totaux'}
            </h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {totalParticipants}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-600" />
            <h3 className="ml-3 text-xl font-medium text-gray-900 dark:text-white">
              {language === 'en' ? 'Average Progress' : 'Progrès moyen'}
            </h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
            {Math.round(averageProgress)}%
          </p>
        </div>
      </div>

      {activePlans.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'en' ? 'Active Plans' : 'Plans actifs'}
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {activePlans.map((plan) => (
              <div key={plan.id} className="space-y-6">
                <PlanCard
                  plan={plan}
                  onArchive={archivePlan}
                  onDelete={deletePlan}
                />
                <ParticipantsList
                  participants={plan.participants}
                  onProgressUpdate={(participantId, pagesRead) =>
                    updateProgress(plan.id, participantId, pagesRead)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {archivedPlans.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === 'en' ? 'Archived Plans' : 'Plans archivés'}
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {archivedPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onArchive={archivePlan}
                onDelete={deletePlan}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}