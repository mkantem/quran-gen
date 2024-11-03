import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, Home, LayoutDashboard, LogIn, LogOut, Menu, Moon, Sun, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-shrink-0 flex items-center">
                <Book className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                  Reading Planner
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  <Home className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Home' : 'Accueil'}
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-1" />
                    Dashboard
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {language === 'en' ? 'FR' : 'EN'}
              </button>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Logout' : 'Déconnexion'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <LogIn className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'Login' : 'Connexion'}
                </button>
              )}
              {isAuthenticated && (
                <div className="ml-3 relative">
                  <button
                    className="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <User className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2024 Reading Planner. {language === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}
          </p>
        </div>
      </footer>
    </div>
  );
}