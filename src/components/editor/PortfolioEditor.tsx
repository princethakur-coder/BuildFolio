import React, { useState } from 'react';
import { Save, Eye, Share2, ArrowLeft } from 'lucide-react';
import { Portfolio, SectionType } from '../../types/portfolio';
import { EditorSidebar } from './EditorSidebar';
import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { ProfessionalTemplate } from '../templates/ProfessionalTemplate';

interface PortfolioEditorProps {
  portfolio: Portfolio;
  onSave: (portfolio: Portfolio) => void;
  onPublish: (portfolioId: string) => string;
  onBack: () => void;
}

export const PortfolioEditor: React.FC<PortfolioEditorProps> = ({
  portfolio,
  onSave,
  onPublish,
  onBack
}) => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');
  const [showPreview, setShowPreview] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState(portfolio);

  const handleSave = () => {
    onSave(currentPortfolio);
  };

  const handlePublish = () => {
    const publishUrl = onPublish(currentPortfolio.id);
    alert(`Portfolio published! URL: ${window.location.origin}/portfolio/${publishUrl}`);
  };

  const handleSectionReorder = (sections: any[]) => {
    setCurrentPortfolio({ ...currentPortfolio, sections });
  };

  const handleSectionToggle = (sectionId: string) => {
    const updatedSections = currentPortfolio.sections.map(section =>
      section.id === sectionId ? { ...section, isVisible: !section.isVisible } : section
    );
    setCurrentPortfolio({ ...currentPortfolio, sections: updatedSections });
  };

  const renderEditor = () => {
    switch (activeSection) {
      case 'hero':
      case 'about':
        return (
          <PersonalInfoEditor
            personalInfo={currentPortfolio.personalInfo}
            onChange={(personalInfo) => setCurrentPortfolio({ ...currentPortfolio, personalInfo })}
          />
        );
      case 'skills':
        return (
          <SkillsEditor
            skills={currentPortfolio.skills}
            onChange={(skills) => setCurrentPortfolio({ ...currentPortfolio, skills })}
          />
        );
      case 'projects':
        return (
          <ProjectsEditor
            projects={currentPortfolio.projects}
            onChange={(projects) => setCurrentPortfolio({ ...currentPortfolio, projects })}
          />
        );
      case 'experience':
        return (
          <ExperienceEditor
            experience={currentPortfolio.experience}
            onChange={(experience) => setCurrentPortfolio({ ...currentPortfolio, experience })}
          />
        );
      case 'education':
        return (
          <EducationEditor
            education={currentPortfolio.education}
            onChange={(education) => setCurrentPortfolio({ ...currentPortfolio, education })}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Select a section from the sidebar to start editing.
            </p>
          </div>
        );
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Editor</span>
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                <Share2 className="w-4 h-4 mr-2 inline" />
                Publish
              </button>
            </div>
          </div>
        </div>
        <ProfessionalTemplate portfolio={currentPortfolio} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <EditorSidebar
        portfolio={currentPortfolio}
        activeSection={activeSection}
        onSectionSelect={setActiveSection}
        onSectionReorder={handleSectionReorder}
        onSectionToggle={handleSectionToggle}
      />

      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editing: {currentPortfolio.personalInfo.name || 'Untitled Portfolio'}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowPreview(true)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
              >
                <Eye className="w-4 h-4 mr-2 inline" />
                Preview
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save
              </button>
              <button
                onClick={handlePublish}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                <Share2 className="w-4 h-4 mr-2 inline" />
                Publish
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {renderEditor()}
        </div>
      </div>
    </div>
  );
};