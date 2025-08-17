import React, { useState } from 'react';
import { X, Download, Code, FileText } from 'lucide-react';
import { ScrapingProject } from '../types/scraping';

interface ExportModalProps {
  projects: ScrapingProject[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ projects, isOpen, onClose }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'python' | 'javascript' | 'json'>('python');
  const [selectedProject, setSelectedProject] = useState<string>('');

  if (!isOpen) return null;

  const generateCode = () => {
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return '';

    if (selectedFormat === 'python') {
      return `# Python Web Scraper for ${project.name}
# Target URL: ${project.url}

import requests
from bs4 import BeautifulSoup
import json

def scrape_${project.name.toLowerCase().replace(/\s+/g, '_')}():
    """${project.description}"""
    url = "${project.url}"
    
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    results = []
    
    # Extract data based on rules
${project.rules.map(rule => `    ${rule.name.toLowerCase().replace(/\s+/g, '_')} = soup.select("${rule.selector}")${rule.attribute ? `\n    ${rule.name.toLowerCase().replace(/\s+/g, '_')}_value = ${rule.name.toLowerCase().replace(/\s+/g, '_')}.get("${rule.attribute}") if ${rule.name.toLowerCase().replace(/\s+/g, '_')} else None` : `\n    ${rule.name.toLowerCase().replace(/\s+/g, '_')}_value = ${rule.name.toLowerCase().replace(/\s+/g, '_')}.text.strip() if ${rule.name.toLowerCase().replace(/\s+/g, '_')} else None`}`).join('\n\n    ')}
    
    data = {
${project.rules.map(rule => `        "${rule.name}": ${rule.name.toLowerCase().replace(/\s+/g, '_')}_value`).join(',\n')}
    }
    
    return data

if __name__ == "__main__":
    result = scrape_${project.name.toLowerCase().replace(/\s+/g, '_')}()
    print(json.dumps(result, indent=2))`;
    }

    if (selectedFormat === 'javascript') {
      return `// JavaScript Web Scraper for ${project.name}
// Target URL: ${project.url}

const puppeteer = require('puppeteer');

async function scrape${project.name.replace(/\s+/g, '')}() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('${project.url}');
    
    const result = await page.evaluate(() => {
        const data = {};
        
${project.rules.map(rule => `        // Extract ${rule.name}
        const ${rule.name.toLowerCase().replace(/\s+/g, '')}Element = document.querySelector('${rule.selector}');
        data['${rule.name}'] = ${rule.attribute ? `${rule.name.toLowerCase().replace(/\s+/g, '')}Element ? ${rule.name.toLowerCase().replace(/\s+/g, '')}Element.getAttribute('${rule.attribute}') : null` : `${rule.name.toLowerCase().replace(/\s+/g, '')}Element ? ${rule.name.toLowerCase().replace(/\s+/g, '')}Element.textContent.trim() : null`};`).join('\n        \n')}
        
        return data;
    });
    
    await browser.close();
    return result;
}

scrape${project.name.replace(/\s+/g, '')}()
    .then(result => console.log(JSON.stringify(result, null, 2)))
    .catch(console.error);`;
    }

    return JSON.stringify(project, null, 2);
  };

  const downloadCode = () => {
    const code = generateCode();
    const project = projects.find(p => p.id === selectedProject);
    if (!project) return;

    const extension = selectedFormat === 'python' ? 'py' : selectedFormat === 'javascript' ? 'js' : 'json';
    const filename = `${project.name.toLowerCase().replace(/\s+/g, '_')}_scraper.${extension}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Export Scraping Configuration</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a project...</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
              <div className="flex space-x-2">
                {[
                  { value: 'python', label: 'Python', icon: Code },
                  { value: 'javascript', label: 'JavaScript', icon: Code },
                  { value: 'json', label: 'JSON', icon: FileText }
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setSelectedFormat(value as any)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                      selectedFormat === value
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {selectedProject && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Generated Code</label>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                  <pre>{generateCode()}</pre>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={downloadCode}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Code</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}