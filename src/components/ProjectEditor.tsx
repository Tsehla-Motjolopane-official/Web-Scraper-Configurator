import React, { useState } from 'react';
import { ArrowLeft, Globe, Save, Eye } from 'lucide-react';
import { ScrapingProject } from '../types/scraping';
import RuleEditor from './RuleEditor';

interface ProjectEditorProps {
  project: ScrapingProject | null;
  onBack: () => void;
  onSave: (project: ScrapingProject) => void;
}

export default function ProjectEditor({ project, onBack, onSave }: ProjectEditorProps) {
  const [editProject, setEditProject] = useState<ScrapingProject>(
    project || {
      id: Date.now().toString(),
      name: '',
      url: '',
      description: '',
      rules: [],
      createdAt: new Date(),
      lastModified: new Date()
    }
  );

  const handleSave = () => {
    const updatedProject = {
      ...editProject,
      lastModified: new Date()
    };
    onSave(updatedProject);
  };

  const testUrl = () => {
    if (editProject.url) {
      window.open(editProject.url, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900">
          {project ? 'Edit Project' : 'New Project'}
        </h2>
      </div>

      <div className="space-y-8">
        {/* Project Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
              <input
                type="text"
                value={editProject.name}
                onChange={(e) => setEditProject({ ...editProject, name: e.target.value })}
                placeholder="e.g., Amazon Product Scraper"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target URL</label>
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={editProject.url}
                  onChange={(e) => setEditProject({ ...editProject, url: e.target.value })}
                  placeholder="https://example.com"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={testUrl}
                  disabled={!editProject.url}
                  className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>Test</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={editProject.description}
                onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                placeholder="Describe what this scraper does..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Scraping Rules */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <RuleEditor
            rules={editProject.rules}
            onRulesChange={(rules) => setEditProject({ ...editProject, rules })}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!editProject.name || !editProject.url}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Project</span>
          </button>
        </div>
      </div>
    </div>
  );
}