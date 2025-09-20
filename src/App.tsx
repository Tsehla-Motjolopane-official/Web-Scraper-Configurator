import React, { useState } from 'react';
import { ScrapingProject } from './types/scraping';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectEditor from './components/ProjectEditor';
import ExportModal from './components/ExportModal';

const sampleProjects: ScrapingProject[] = [
  {
    id: '1',
    name: 'E-commerce Product Scraper',
    url: 'https://example-store.com/products',
    description: 'Extract product information including title, price, description, and images from e-commerce websites.',
    rules: [
      {
        id: '1',
        name: 'Product Title',
        selector: '.product-title',
        dataType: 'text',
        required: true
      },
      {
        id: '2',
        name: 'Price',
        selector: '.price',
        dataType: 'number',
        required: true
      },
      {
        id: '3',
        name: 'Product Image',
        selector: '.product-image img',
        attribute: 'src',
        dataType: 'image',
        required: false
      }
    ],
    createdAt: new Date('2024-01-15'),
    lastModified: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'News Article Scraper',
    url: 'https://example-news.com/articles',
    description: 'Scrape news articles to extract headlines, content, author information, and publication dates.',
    rules: [
      {
        id: '4',
        name: 'Headline',
        selector: 'h1.article-title',
        dataType: 'text',
        required: true
      },
      {
        id: '5',
        name: 'Author',
        selector: '.author-name',
        dataType: 'text',
        required: false
      },
      {
        id: '6',
        name: 'Article Content',
        selector: '.article-body',
        dataType: 'text',
        required: true
      }
    ],
    createdAt: new Date('2024-01-18'),
    lastModified: new Date('2024-01-19')
  }
];

function App() {
  const [projects, setProjects] = useState<ScrapingProject[]>(sampleProjects);
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedProject, setSelectedProject] = useState<ScrapingProject | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleNewProject = () => {
    setSelectedProject(null);
    setCurrentView('editor');
  };

  const handleSelectProject = (project: ScrapingProject) => {
    setSelectedProject(project);
    setCurrentView('editor');
  };

  const handleEditProject = (project: ScrapingProject) => {
    setSelectedProject(project);
    setCurrentView('editor');
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSaveProject = (project: ScrapingProject) => {
    if (projects.find(p => p.id === project.id)) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      setProjects([...projects, project]);
    }
    setCurrentView('dashboard');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedProject(null);
  };

  if (currentView === 'editor') {
    return (
  <div className="min-h-screen bg-background text-text">
        <Header onNewProject={handleNewProject} onExport={() => setShowExportModal(true)} />
        <ProjectEditor
          project={selectedProject}
          onBack={handleBackToDashboard}
          onSave={handleSaveProject}
        />
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-background text-text">
      <Header onNewProject={handleNewProject} onExport={() => setShowExportModal(true)} />
      
  <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-2">Your Scraping Projects</h2>
          <p className="text-text-light">
            Create and manage customizable web scraping configurations for any website.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-surface rounded-lg border-2 border-dashed border-primary-light p-12">
              <h3 className="text-lg font-medium text-primary mb-2">No projects yet</h3>
              <p className="text-text-light mb-6">Get started by creating your first scraping project.</p>
              <button
                onClick={handleNewProject}
                className="btn-primary px-6 py-3"
              >
                Create Your First Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={handleSelectProject}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
              />
            ))}
          </div>
        )}
      </main>

      <ExportModal
        projects={projects}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}

export default App;