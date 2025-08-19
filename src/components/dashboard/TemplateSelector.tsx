import React from 'react';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
import { TemplateType } from '../../types/portfolio';

interface TemplateSelectorProps {
  onSelect: (template: TemplateType) => void;
  onClose: () => void;
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
    color: 'from-coffee-600 to-coffee-800'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold colors and animations',
    preview: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-sand-600 to-sand-800'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant with focus on content',
    preview: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-coffee-500 to-coffee-700'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic and expressive for creative professionals',
    preview: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-sand-500 to-sand-700'
  },
  {
    id: '3d',
    name: '3D Interactive',
    description: 'Immersive 3D elements and interactive components',
    preview: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'from-coffee-700 to-brown-800'
  }
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-warm-lg border border-cream-200 max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6 border-b border-cream-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brown-800">Choose a Template</h2>
            <p className="text-gray-600 mt-1">
            Select a template that matches your style and profession
          </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-coffee-500 hover:text-coffee-700 hover:bg-cream-100 rounded-xl transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => onSelect(template.id)}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft hover:shadow-warm-lg transition-all duration-300">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-90 transition-all duration-300 flex items-center justify-center`}>
                  <div className="text-center text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <Check className="w-12 h-12 mx-auto mb-2" />
                    <p className="font-semibold">Select Template</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-brown-800">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
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