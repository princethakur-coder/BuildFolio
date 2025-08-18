import { useState, useEffect } from 'react';
import { Portfolio, TemplateType } from '../types/portfolio';

export const usePortfolio = (userId: string | null) => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      loadPortfolios();
    }
  }, [userId]);

  const loadPortfolios = () => {
    setIsLoading(true);
    const savedPortfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const userPortfolios = savedPortfolios.filter((p: Portfolio) => p.userId === userId);
    setPortfolios(userPortfolios);
    setIsLoading(false);
  };

  const createPortfolio = (template: TemplateType): Portfolio => {
    if (!userId) throw new Error('User not authenticated');

    const newPortfolio: Portfolio = {
      id: Date.now().toString(),
      userId,
      template,
      personalInfo: {
        name: '',
        title: '',
        bio: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        linkedin: '',
        github: '',
        twitter: ''
      },
      skills: [],
      projects: [],
      experience: [],
      education: [],
      sections: [
        { id: '1', type: 'hero', title: 'Hero Section', isVisible: true, order: 0 },
        { id: '2', type: 'about', title: 'About Me', isVisible: true, order: 1 },
        { id: '3', type: 'skills', title: 'Skills', isVisible: true, order: 2 },
        { id: '4', type: 'projects', title: 'Projects', isVisible: true, order: 3 },
        { id: '5', type: 'experience', title: 'Experience', isVisible: true, order: 4 },
        { id: '6', type: 'education', title: 'Education', isVisible: true, order: 5 },
        { id: '7', type: 'contact', title: 'Contact', isVisible: true, order: 6 }
      ],
      theme: 'light',
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allPortfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    allPortfolios.push(newPortfolio);
    localStorage.setItem('portfolios', JSON.stringify(allPortfolios));
    
    setPortfolios(prev => [...prev, newPortfolio]);
    setCurrentPortfolio(newPortfolio);
    
    return newPortfolio;
  };

  const updatePortfolio = (updatedPortfolio: Portfolio) => {
    updatedPortfolio.updatedAt = new Date().toISOString();
    
    const allPortfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const index = allPortfolios.findIndex((p: Portfolio) => p.id === updatedPortfolio.id);
    
    if (index !== -1) {
      allPortfolios[index] = updatedPortfolio;
      localStorage.setItem('portfolios', JSON.stringify(allPortfolios));
      
      setPortfolios(prev => prev.map(p => p.id === updatedPortfolio.id ? updatedPortfolio : p));
      setCurrentPortfolio(updatedPortfolio);
    }
  };

  const publishPortfolio = (portfolioId: string) => {
    const publishUrl = `portfolio-${portfolioId}-${Date.now()}`;
    const allPortfolios = JSON.parse(localStorage.getItem('portfolios') || '[]');
    const index = allPortfolios.findIndex((p: Portfolio) => p.id === portfolioId);
    
    if (index !== -1) {
      allPortfolios[index].isPublished = true;
      allPortfolios[index].publishUrl = publishUrl;
      localStorage.setItem('portfolios', JSON.stringify(allPortfolios));
      
      setPortfolios(prev => prev.map(p => 
        p.id === portfolioId ? { ...p, isPublished: true, publishUrl } : p
      ));
      
      if (currentPortfolio?.id === portfolioId) {
        setCurrentPortfolio(prev => prev ? { ...prev, isPublished: true, publishUrl } : null);
      }
    }
    
    return publishUrl;
  };

  return {
    portfolios,
    currentPortfolio,
    setCurrentPortfolio,
    isLoading,
    createPortfolio,
    updatePortfolio,
    publishPortfolio
  };
};