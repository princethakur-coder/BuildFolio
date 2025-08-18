import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  FolderOpen, 
  Mail,
  Eye,
  EyeOff
} from 'lucide-react';
import { Portfolio, Section, SectionType } from '../../types/portfolio';

interface EditorSidebarProps {
  portfolio: Portfolio;
  activeSection: string;
  onSectionSelect: (sectionType: SectionType) => void;
  onSectionReorder: (sections: Section[]) => void;
  onSectionToggle: (sectionId: string) => void;
}

const sectionIcons = {
  hero: User,
  about: User,
  skills: Code,
  projects: FolderOpen,
  experience: Briefcase,
  education: GraduationCap,
  contact: Mail
};

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  portfolio,
  activeSection,
  onSectionSelect,
  onSectionToggle
}) => {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Portfolio Sections
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click to edit sections, toggle visibility
        </p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {portfolio.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => {
              const Icon = sectionIcons[section.type];
              const isActive = activeSection === section.type;
              
              return (
                <div
                  key={section.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-200 ${
                    isActive 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  
                  <span 
                    className="flex-1 font-medium" 
                    onClick={() => onSectionSelect(section.type)}
                  >
                    {section.title}
                  </span>
                  
                  <button
                    onClick={() => onSectionToggle(section.id)}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    {section.isVisible ? 
                      <Eye className="w-4 h-4" /> : 
                      <EyeOff className="w-4 h-4" />
                    }
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};