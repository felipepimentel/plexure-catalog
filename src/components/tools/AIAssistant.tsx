import React, { useState } from 'react';
import { Sparkles, Send, Code2, Copy } from 'lucide-react';
import { Card } from '../ui/Card';

interface AIAssistantProps {
  onGenerateCode: (prompt: string) => Promise<string>;
}

export function AIAssistant({ onGenerateCode }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      const code = await onGenerateCode(prompt);
      setGeneratedCode(code);
    } catch (error) {
      console.error('Failed to generate code:', error);
    }
    setLoading(false);
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-5 w-5 text-[#4FC3F7]" />
        <h3 className="text-lg font-semibold text-white">AI Integration Assistant</h3>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to build with this API..."
            className="w-full px-4 py-3 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent resize-none h-32"
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="absolute bottom-3 right-3 p-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      {generatedCode && (
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Code2 className="h-4 w-4 text-[#4FC3F7]" />
              <span className="text-[#E0E0E0] text-sm">Generated Code</span>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(generatedCode)}
              className="p-1 text-[#E0E0E0] hover:text-white rounded"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <pre className="bg-[#2A2A2A] p-4 rounded-lg overflow-x-auto">
            <code className="text-[#E0E0E0] text-sm">{generatedCode}</code>
          </pre>
        </div>
      )}
    </Card>
  );
}