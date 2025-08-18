import React from 'react';
import { Calendar, ExternalLink, Eye, Settings } from 'lucide-react';
import { Portfolio } from '../../types/portfolio';

interface PortfolioCardProps {
  portfolio: Portfolio;
  onEdit: (portfolio: Portfolio) => void;
  onPreview: (portfolio: Portfolio) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio, onEdit, onPreview }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTemplateColor = (template: string) => {
    const colors = {
      professional: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
      modern: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300',
      minimal: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      creative: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300',
      '3d': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
    };
    return colors[template as keyof typeof colors] || colors.professional;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition duration-200 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {portfolio.personalInfo.name || 'Untitled Portfolio'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {portfolio.personalInfo.title || 'No title set'}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTemplateColor(portfolio.template)}`}>
                {portfolio.template}
              </span>
              {portfolio.isPublished && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                  Published
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Updated {formatDate(portfolio.updatedAt)}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onEdit(portfolio)}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit
          </button>

          <button
            onClick={() => onPreview(portfolio)}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>

          {portfolio.isPublished && (
            <button
              onClick={() => window.open(`/portfolio/${portfolio.publishUrl}`, '_blank')}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
              title="Open published portfolio"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};