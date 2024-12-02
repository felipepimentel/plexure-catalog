import React, { useState } from 'react';
import { Code2, Download, Check } from 'lucide-react';
import { Card } from '../ui/Card';

interface Language {
  id: string;
  name: string;
  icon: string;
}

const languages: Language[] = [
  { id: 'typescript', name: 'TypeScript', icon: '🟦' },
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'go', name: 'Go', icon: '🔵' },
  { id: 'ruby', name: 'Ruby', icon: '💎' },
  { id: 'csharp', name: 'C#', icon: '🟣' }
];

interface SDKGeneratorProps {
  onGenerate: (language: string) => Promise<void>;
}

export function SDKGenerator({ onGenerate }: SDKGeneratorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!selectedLanguage || generating) return;

    setGenerating(true);
    try {
      await onGenerate(selectedLanguage);
      setGenerated([...generated, selectedLanguage]);
    } catch (error) {
      console.error('Failed to generate SDK:', error);
    }
    setGenerating(false);
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Code2 className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">SDK Generator</h3>
        </div>
        <button
          onClick={handleGenerate}
          disabled={!selectedLanguage || generating}
          className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>{generating ? 'Generating...' : 'Generate SDK'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelectedLanguage(lang.id)}
            className={`p-4 rounded-lg border ${
              selectedLanguage === lang.id
                ? 'border-[#FF5722] bg-[#2A2A2A]'
                : 'border-[#424242] hover:border-[#FF5722] hover:bg-[#2A2A2A]'
            } transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{lang.icon}</span>
                <span className="text-white font-medium">{lang.name}</span>
              </div>
              {generated.includes(lang.id) && (
                <span className="flex items-center space-x-1 text-[#4ADE80]">
                  <Check className="h-4 w-4" />
                  <span className="text-xs">Generated</span>
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}