import React from 'react';
import { Calendar, ExternalLink, Edit3, Trash2 } from 'lucide-react';
import { ScrapingProject } from '../types/scraping';

interface ProjectCardProps {
  project: ScrapingProject;
  onSelect: (project: ScrapingProject) => void;
  onEdit: (project: ScrapingProject) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onSelect, onEdit, onDelete }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
      <div className="p-6" onClick={() => onSelect(project)}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{project.name}</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              className="text-gray-400 hover:text-blue-600 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(project.id);
              }}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <ExternalLink className="w-3 h-3" />
            <span className="truncate max-w-32">{new URL(project.url).hostname}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{project.lastModified.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {project.rules.length} rules
          </span>
        </div>
      </div>
    </div>
  );
}