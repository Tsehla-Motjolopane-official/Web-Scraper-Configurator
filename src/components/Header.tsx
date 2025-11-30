import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onNewProject: () => void;
  onExport: () => void;
}

export default function Header({ onNewProject, onExport }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 card border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[rgb(var(--color-primary))] rounded-lg">
            <i className="fa-solid fa-globe text-white" style={{ fontSize: '1rem' }} />
          </div>
          <div>
            <h1 className="text-xl font-bold">ScrapeWeb</h1>
            <p className="text-sm opacity-80">Customizable Web Scraping Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={onNewProject}
            className="btn-primary"
          >
            New Project
          </button>
          <button
            onClick={onExport}
            className="btn-accent flex items-center space-x-2"
          >
            <i className="fa-solid fa-download" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
}