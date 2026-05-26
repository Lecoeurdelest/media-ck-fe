import { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export function NewProjectInput() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid' | 'loading'>('idle');
  const [error, setError] = useState('');

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrl(value);

    if (value.length > 0) {
      if (validateUrl(value)) {
        setStatus('valid');
        setError('');
      } else {
        setStatus('invalid');
        setError('Invalid URL format');
      }
    } else {
      setStatus('idle');
      setError('');
    }
  };

  const handleFetch = () => {
    if (status === 'valid') {
      setStatus('loading');
      // Simulate API call
      setTimeout(() => {
        setStatus('idle');
        setUrl('');
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <div className="px-4 py-3 border-b border-[#E5E7EB] bg-white">
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter product URL to start scraping..."
              disabled={status === 'loading'}
              className={`w-full h-12 px-3 pr-10 border rounded text-sm ${
                status === 'valid'
                  ? 'border-[#10B981] focus:border-[#10B981]'
                  : status === 'invalid'
                  ? 'border-[#EF4444] focus:border-[#EF4444]'
                  : 'border-[#D1D5DB] focus:border-[#3B82F6]'
              } ${status === 'loading' ? 'bg-[#F9FAFB]' : 'bg-white'} outline-none focus:ring-2 focus:ring-offset-0 ${
                status === 'valid'
                  ? 'focus:ring-[#10B981]/20'
                  : status === 'invalid'
                  ? 'focus:ring-[#EF4444]/20'
                  : 'focus:ring-[#3B82F6]/20'
              }`}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {status === 'loading' && <Loader2 className="w-5 h-5 text-[#3B82F6] animate-spin" />}
              {status === 'valid' && <CheckCircle className="w-5 h-5 text-[#10B981]" />}
              {status === 'invalid' && <AlertCircle className="w-5 h-5 text-[#EF4444]" />}
            </div>
          </div>
          <button
            onClick={handleFetch}
            disabled={status !== 'valid'}
            className="w-30 h-12 px-4 bg-[#3B82F6] text-white rounded font-medium hover:bg-[#2563EB] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Fetch
          </button>
        </div>
        {error && (
          <div className="text-xs text-[#EF4444] mt-1 ml-1">{error}</div>
        )}
      </div>
    </div>
  );
}
