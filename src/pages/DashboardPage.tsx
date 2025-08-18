import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { usePortfolio } from '../hooks/usePortfolio';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { PortfolioCard } from '../components/dashboard/PortfolioCard';
import { TemplateSelector } from '../components/dashboard/TemplateSelector';
import { PortfolioEditor } from '../components/editor/PortfolioEditor';
import { Portfolio, TemplateType } from '../types/portfolio';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    portfolios, 
    currentPortfolio, 
    setCurrentPortfolio,
    isLoading, 
    createPortfolio, 
    updatePortfolio, 
    publishPortfolio 
  } = usePortfolio(user?.id || null);

  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  const handleCreatePortfolio = (template: TemplateType) => {
    const newPortfolio = createPortfolio(template);
    setShowTemplateSelector(false);
    setEditingPortfolio(newPortfolio);
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setCurrentPortfolio(portfolio);
    setEditingPortfolio(portfolio);
  };

  const handleSavePortfolio = (portfolio: Portfolio) => {
    updatePortfolio(portfolio);
  };

  const handlePublishPortfolio = (portfolioId: string) => {
    return publishPortfolio(portfolioId);
  };

  const handleBackToDashboard = () => {
    setEditingPortfolio(null);
    setCurrentPortfolio(null);
  };

  if (editingPortfolio) {
    return (
      <PortfolioEditor
        portfolio={editingPortfolio}
        onSave={handleSavePortfolio}
        onPublish={handlePublishPortfolio}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Portfolios</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create and manage your professional portfolios
            </p>
          </div>

          <button
            onClick={() => setShowTemplateSelector(true)}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>New Portfolio</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : portfolios.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create Your First Portfolio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Get started by choosing a template that matches your style and profession.
              </p>
              <button
                onClick={() => setShowTemplateSelector(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-200 transform hover:scale-105"
              >
                Choose Template
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                onEdit={handleEditPortfolio}
                onPreview={handleEditPortfolio}
              />
            ))}
          </div>
        )}
      </main>

      {showTemplateSelector && (
        <TemplateSelector onSelect={handleCreatePortfolio} />
      )}
    </div>
  );
};