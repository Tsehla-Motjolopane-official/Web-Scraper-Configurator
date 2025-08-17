import React, { useState } from 'react';
import { Plus, Target, Type, Link, Image, Hash } from 'lucide-react';
import { ScrapingRule } from '../types/scraping';

interface RuleEditorProps {
  rules: ScrapingRule[];
  onRulesChange: (rules: ScrapingRule[]) => void;
}

const dataTypeIcons = {
  text: Type,
  link: Link,
  image: Image,
  number: Hash
};

export default function RuleEditor({ rules, onRulesChange }: RuleEditorProps) {
  const [newRule, setNewRule] = useState<Partial<ScrapingRule>>({
    name: '',
    selector: '',
    dataType: 'text',
    required: false
  });

  const addRule = () => {
    if (newRule.name && newRule.selector) {
      const rule: ScrapingRule = {
        id: Date.now().toString(),
        name: newRule.name,
        selector: newRule.selector,
        attribute: newRule.attribute,
        dataType: newRule.dataType || 'text',
        required: newRule.required || false
      };
      onRulesChange([...rules, rule]);
      setNewRule({
        name: '',
        selector: '',
        dataType: 'text',
        required: false
      });
    }
  };

  const removeRule = (id: string) => {
    onRulesChange(rules.filter(rule => rule.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Extraction Rules</h3>
        <span className="text-sm text-gray-500">{rules.length} rules configured</span>
      </div>

      {/* Existing Rules */}
      <div className="space-y-3">
        {rules.map((rule) => {
          const Icon = dataTypeIcons[rule.dataType];
          return (
            <div key={rule.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">{rule.name}</span>
                    {rule.required && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">Required</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                    {rule.selector}
                  </div>
                  {rule.attribute && (
                    <div className="text-xs text-gray-500 mt-1">
                      Attribute: <span className="font-mono">{rule.attribute}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeRule(rule.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors ml-2"
                >
                  <Target className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Rule */}
      <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Add New Rule</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rule Name</label>
            <input
              type="text"
              value={newRule.name || ''}
              onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              placeholder="e.g., Product Title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Type</label>
            <select
              value={newRule.dataType || 'text'}
              onChange={(e) => setNewRule({ ...newRule, dataType: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="text">Text</option>
              <option value="link">Link</option>
              <option value="image">Image</option>
              <option value="number">Number</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">CSS Selector</label>
          <input
            type="text"
            value={newRule.selector || ''}
            onChange={(e) => setNewRule({ ...newRule, selector: e.target.value })}
            placeholder="e.g., .product-title, #price, [data-testid='description']"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Attribute (Optional)</label>
          <input
            type="text"
            value={newRule.attribute || ''}
            onChange={(e) => setNewRule({ ...newRule, attribute: e.target.value })}
            placeholder="e.g., href, src, title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={newRule.required || false}
              onChange={(e) => setNewRule({ ...newRule, required: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Required field</span>
          </label>
          
          <button
            onClick={addRule}
            disabled={!newRule.name || !newRule.selector}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rule</span>
          </button>
        </div>
      </div>
    </div>
  );
}