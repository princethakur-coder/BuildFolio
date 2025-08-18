import React from 'react';
import { Portfolio } from '../../types/portfolio';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Twitter } from 'lucide-react';

interface ProfessionalTemplateProps {
  portfolio: Portfolio;
}

export const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ portfolio }) => {
  const { personalInfo, skills, projects, experience, education, sections } = portfolio;
  const visibleSections = sections.filter(s => s.isVisible).sort((a, b) => a.order - b.order);

  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case 'hero':
        return (
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h1 className="text-5xl font-bold mb-4">{personalInfo.name}</h1>
              <p className="text-xl mb-6 opacity-90">{personalInfo.title}</p>
              <p className="text-lg max-w-3xl mx-auto opacity-80">{personalInfo.bio}</p>
            </div>
          </section>
        );

      case 'about':
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">About Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-600 leading-relaxed">{personalInfo.bio}</p>
                </div>
                <div className="space-y-4">
                  {personalInfo.email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">{skill.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    {project.image && (
                      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'experience':
        return (
          <section className="py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Experience</h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-blue-600 font-medium">{exp.company}</p>
                        <p className="text-gray-600">{exp.location}</p>
                      </div>
                      <span className="text-gray-500 text-sm">{exp.duration}</span>
                    </div>
                    <p className="text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'education':
        return (
          <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Education</h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-blue-600 font-medium">{edu.institution}</p>
                        <p className="text-gray-600">{edu.field}</p>
                        {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                      </div>
                      <span className="text-gray-500 text-sm">{edu.duration}</span>
                    </div>
                    {edu.description && <p className="text-gray-600">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className="py-16 bg-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              <p className="text-xl mb-8 opacity-80">Let's work together!</p>
              <div className="flex justify-center space-x-6">
                {personalInfo.email && (
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition duration-200"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Me</span>
                  </a>
                )}
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {personalInfo.github && (
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {visibleSections.map((section) => (
        <div key={section.id}>
          {renderSection(section.type)}
        </div>
      ))}
    </div>
  );
};