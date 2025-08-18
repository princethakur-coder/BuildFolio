import React from 'react';
import { Check } from 'lucide-react';
import { TemplateType } from '../../types/portfolio';

interface TemplateSelectorProps {
  onSelect: (template: TemplateType) => void;
}

const templates: Array<{
  id: TemplateType;
  name: string;
  description: string;
  preview: string;
  color: string;
}> = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and formal design perfect for corporate roles',
    preview: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold colors and animations',
    preview: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with focus on content',
    preview: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-gray-600 to-gray-800'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and expressive for creative professionals',
    preview: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-pink-600 to-pink-800'
  },
  {
    id: '3d',
    name: '3D Interactive',
    description: 'Immersive 3D elements and interactive components',
    preview: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-indigo-600 to-indigo-800'
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Choose a Template</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Select a template that matches your style and profession
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelect(template.id)}
              className="group cursor-pointer transform hover:scale-105 transition duration-300"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-90 transition duration-300 flex items-center justify-center`}>
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition duration-300">
                    <Check className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Select Template</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};