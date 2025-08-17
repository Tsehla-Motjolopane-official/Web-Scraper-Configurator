import React from 'react';
import { Globe, Settings, Download } from 'lucide-react';

interface HeaderProps {
  onNewProject: () => void;
  onExport: () => void;
}

export default function Header({ onNewProject, onExport }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ScrapeMaster</h1>
            <p className="text-sm text-gray-500">Customizable Web Scraping Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onNewProject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            New Project
          </button>
          <button
            onClick={onExport}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
}