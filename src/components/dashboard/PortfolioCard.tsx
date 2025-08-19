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
      professional: 'bg-coffee-100 text-coffee-800',
      modern: 'bg-sand-100 text-sand-800',
      minimal: 'bg-beige-100 text-beige-800',
      creative: 'bg-sand-100 text-sand-700',
      '3d': 'bg-coffee-100 text-coffee-700'
    };
    return colors[template as keyof typeof colors] || colors.professional;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-cream-200 hover:shadow-warm-lg transition-all duration-300 group animate-fade-in">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-brown-800 mb-2">
              {portfolio.personalInfo.name || 'Untitled Portfolio'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {portfolio.personalInfo.title || 'No title set'}
            </p>
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTemplateColor(portfolio.template)}`}>
                {portfolio.template}
              </span>
              {portfolio.isPublished && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Published
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Updated {formatDate(portfolio.updatedAt)}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onEdit(portfolio)}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-cream-100 text-coffee-700 rounded-xl hover:bg-cream-200 transition-all duration-200"
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit
          </button>

          <button
            onClick={() => onPreview(portfolio)}
            className="flex-1 flex items-center justify-center px-3 py-2 bg-gradient-to-r from-coffee-600 to-sand-600 text-white rounded-xl hover:from-coffee-700 hover:to-sand-700 transition-all duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>

          {portfolio.isPublished && (
            <button
              onClick={() => window.open(`/portfolio/${portfolio.publishUrl}`, '_blank')}
              className="p-2 text-coffee-500 hover:text-coffee-700 transition-all duration-200"
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