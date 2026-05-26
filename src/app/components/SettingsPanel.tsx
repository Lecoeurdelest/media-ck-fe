import { CheckCircle, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [openAiKey, setOpenAiKey] = useState('sk-proj-xxxxxxxxxxxxx');
  const [geminiKey, setGeminiKey] = useState('AIzaSyxxxxxxxxxxxxx');
  const [activePromptTab, setActivePromptTab] = useState<'library' | 'create'>('library');
  const [selectedPrompt, setSelectedPrompt] = useState<number | null>(0);
  const [prompts, setPrompts] = useState([
    {
      id: 0,
      name: 'Product Review Script',
      description: 'Standard template for product review videos',
      content: 'You are a professional product reviewer. Create an engaging review script that highlights key features, pros, cons, and final verdict.',
      category: 'Review',
      isFavorite: true,
    },
    {
      id: 1,
      name: 'Educational Tutorial',
      description: 'Template for teaching and tutorial content',
      content: 'You are an expert educator. Create a clear, step-by-step tutorial that breaks down complex topics into easy-to-understand segments.',
      category: 'Education',
      isFavorite: false,
    },
    {
      id: 2,
      name: 'Product Demo',
      description: 'Showcase product features and benefits',
      content: 'You are a product specialist. Demonstrate the product features in an engaging way, showing real-world use cases and benefits.',
      category: 'Demo',
      isFavorite: true,
    },
  ]);
  const [newPromptName, setNewPromptName] = useState('');
  const [newPromptContent, setNewPromptContent] = useState('');
  const [newPromptCategory, setNewPromptCategory] = useState('Review');
  const [characterModel, setCharacterModel] = useState('Thầy giáo nam');
  const [customCharacterName, setCustomCharacterName] = useState('');
  const [characterGender, setCharacterGender] = useState('male');
  const [characterAge, setCharacterAge] = useState('adult');
  const [backgroundStyle, setBackgroundStyle] = useState('classroom');
  const [actionVideo1, setActionVideo1] = useState('Review');
  const [actionVideo2, setActionVideo2] = useState('Review');
  const [zeroCredit, setZeroCredit] = useState(true);
  const [upscale, setUpscale] = useState(false);

  const handleSave = () => {
    alert('Settings saved successfully!');
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-[900px] max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 h-20 border-b border-gray-200 flex-shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Tool Settings</h2>
            <p className="text-sm text-gray-500 mt-1">Configure your automation parameters and API connections</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close settings dialog"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Configure APIs/Keys */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">API Keys Configuration</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OpenAI Key (Thay thế Gemini)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="sk-proj-xxxxxxxxxxxxx"
                  />
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gemini Key 1
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full h-11 px-4 pr-10 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    placeholder="AIzaSyxxxxxxxxxxxxx"
                  />
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Prompt Management */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">Prompt Library</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setActivePromptTab('library')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activePromptTab === 'library'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  My Prompts
                </button>
                <button
                  onClick={() => setActivePromptTab('create')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    activePromptTab === 'create'
                      ? 'bg-blue-500 text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Prompt
                </button>
              </div>
            </div>

            {activePromptTab === 'library' ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Prompt List */}
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {prompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      onClick={() => setSelectedPrompt(prompt.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedPrompt === prompt.id
                          ? 'bg-blue-50 border-blue-300 shadow-sm'
                          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900">{prompt.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{prompt.description}</p>
                        </div>
                        {prompt.isFavorite && (
                          <svg className="w-4 h-4 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        )}
                      </div>
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                        {prompt.category}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Prompt Preview */}
                <div className="bg-white border border-gray-300 rounded-lg p-4">
                  {selectedPrompt !== null ? (
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{prompts[selectedPrompt].name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{prompts[selectedPrompt].description}</p>
                        </div>
                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-gray-700 mb-2">Prompt Content</label>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 leading-relaxed min-h-32 max-h-48 overflow-y-auto">
                          {prompts[selectedPrompt].content}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                          Use Prompt
                        </button>
                        <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
                          Duplicate
                        </button>
                        <button className="px-3 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      Select a prompt to preview
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prompt Name
                      </label>
                      <input
                        type="text"
                        value={newPromptName}
                        onChange={(e) => setNewPromptName(e.target.value)}
                        placeholder="e.g., Product Review Script"
                        className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newPromptCategory}
                        onChange={(e) => setNewPromptCategory(e.target.value)}
                        className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all appearance-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '0.75rem'
                        }}
                      >
                        <option value="Review">Review</option>
                        <option value="Education">Education</option>
                        <option value="Demo">Demo</option>
                        <option value="Tutorial">Tutorial</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prompt Content
                    </label>
                    <textarea
                      value={newPromptContent}
                      onChange={(e) => setNewPromptContent(e.target.value)}
                      placeholder="Enter your prompt instructions here... Be specific about the tone, style, and structure you want."
                      rows={6}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Tip:</span> Use clear instructions and provide context for best results
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActivePromptTab('library')}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors">
                        Save Prompt
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Character & Background Model */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Character & Background Model</h3>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Preset Character */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preset Character Template
                </label>
                <select
                  value={characterModel}
                  onChange={(e) => setCharacterModel(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1rem'
                  }}
                >
                  <option value="Thầy giáo nam">Thầy giáo nam</option>
                  <option value="Cô giáo nữ">Cô giáo nữ</option>
                  <option value="Nhân vật nam">Nhân vật nam</option>
                  <option value="Nhân vật nữ">Nhân vật nữ</option>
                  <option value="custom">Custom Character</option>
                </select>
              </div>

              {/* Custom Character Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Character Name (Optional)
                </label>
                <input
                  type="text"
                  value={customCharacterName}
                  onChange={(e) => setCustomCharacterName(e.target.value)}
                  placeholder="Enter character name..."
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={characterGender}
                  onChange={(e) => setCharacterGender(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '0.75rem'
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age Group
                </label>
                <select
                  value={characterAge}
                  onChange={(e) => setCharacterAge(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '0.75rem'
                  }}
                >
                  <option value="young">Young (18-25)</option>
                  <option value="adult">Adult (26-45)</option>
                  <option value="middle">Middle-aged (46-60)</option>
                  <option value="senior">Senior (60+)</option>
                </select>
              </div>

              {/* Background Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Style
                </label>
                <select
                  value={backgroundStyle}
                  onChange={(e) => setBackgroundStyle(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all appearance-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B7280' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '0.75rem'
                  }}
                >
                  <option value="classroom">Classroom</option>
                  <option value="office">Office</option>
                  <option value="studio">Studio</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="gradient">Gradient</option>
                </select>
              </div>
            </div>

            {/* Character Preview Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900 mb-1">Character Configuration</p>
                  <p className="text-xs text-blue-700">
                    Selected: <span className="font-semibold">{customCharacterName || characterModel}</span> •
                    Gender: <span className="font-semibold">{characterGender}</span> •
                    Age: <span className="font-semibold">{characterAge}</span> •
                    Background: <span className="font-semibold">{backgroundStyle}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Advanced Options</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={zeroCredit}
                    onChange={(e) => setZeroCredit(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 group-hover:border-blue-400 transition-all flex items-center justify-center">
                    {zeroCredit && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 font-medium">Tạo Video 0 Credit (Relaxed)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={upscale}
                    onChange={(e) => setUpscale(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-blue-500 peer-checked:border-blue-500 group-hover:border-blue-400 transition-all flex items-center justify-center">
                    {upscale && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-700 font-medium">Upscale 16:9p</span>
              </label>
            </div>
          </div>

          {/* Action Video Sequence */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Action Video Sequence</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action Video 1 (Review)
                </label>
                <select
                  value={actionVideo1}
                  onChange={(e) => setActionVideo1(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all"
                >
                  <option value="Review">Review</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Demo">Demo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action Video 2 (Review)
                </label>
                <select
                  value={actionVideo2}
                  onChange={(e) => setActionVideo2(e.target.value)}
                  className="w-full h-11 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none cursor-pointer transition-all"
                >
                  <option value="Review">Review</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Demo">Demo</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-8 h-20 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0">
          <p className="text-sm text-gray-500">All changes will be applied immediately after saving</p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="px-6 h-11 border border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 h-11 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <Save className="w-4 h-4" />
              Lưu Setting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
