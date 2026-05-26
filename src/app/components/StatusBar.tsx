import { Loader2, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useState } from 'react';

export function StatusBar() {
  const [processes] = useState([
    { id: 1, name: 'Downloading images', progress: 65, status: 'processing' as const },
    { id: 2, name: 'Rendering video', progress: 100, status: 'complete' as const },
  ]);

  const [expanded, setExpanded] = useState(false);

  if (processes.length === 0) {
    return null;
  }

  const activeProcess = processes.find(p => p.status === 'processing');

  return (
    <div className="border-t border-[#E5E7EB] bg-white">
      {/* Collapsed View */}
      {!expanded && activeProcess && (
        <div
          className="h-10 px-4 flex items-center gap-3 cursor-pointer hover:bg-[#F9FAFB]"
          onClick={() => setExpanded(true)}
        >
          <Loader2 className="w-4 h-4 text-[#3B82F6] animate-spin" />
          <div className="flex-1 flex items-center gap-3">
            <span className="text-sm text-[#374151]">{activeProcess.name}</span>
            <div className="w-48 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#3B82F6] transition-all"
                style={{ width: `${activeProcess.progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono text-[#6B7280]">{activeProcess.progress}%</span>
          </div>
          <button className="p-1 hover:bg-[#E5E7EB] rounded">
            <Settings className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      )}

      {/* Expanded View */}
      {expanded && (
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[#374151]">Background Processes</span>
            <button
              onClick={() => setExpanded(false)}
              className="text-xs text-[#3B82F6] hover:underline"
            >
              Collapse
            </button>
          </div>
          <div className="space-y-2">
            {processes.map(process => (
              <div key={process.id} className="flex items-center gap-3">
                {process.status === 'processing' && (
                  <Loader2 className="w-4 h-4 text-[#3B82F6] animate-spin flex-shrink-0" />
                )}
                {process.status === 'complete' && (
                  <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                )}
                {process.status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="text-sm text-[#374151] mb-1">{process.name}</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1 bg-[#E5E7EB] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          process.status === 'complete' ? 'bg-[#10B981]' :
                          process.status === 'error' ? 'bg-[#EF4444]' :
                          'bg-[#3B82F6]'
                        }`}
                        style={{ width: `${process.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono text-[#6B7280] w-10 text-right">
                      {process.progress}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
