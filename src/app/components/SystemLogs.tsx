import { CheckCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LogEntry {
  timestamp: string;
  message: string;
  status: 'success' | 'processing' | 'error';
}

export function SystemLogs() {
  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: '10:24:12', message: 'Đã khởi tạo VLC Media Player', status: 'success' },
    { timestamp: '10:24:15', message: 'Kết nối API thành công', status: 'success' },
    { timestamp: '10:24:18', message: 'Đang xử lý video...', status: 'processing' },
  ]);
  const [expanded, setExpanded] = useState(false);
  const [vlcStatus, setVlcStatus] = useState<'active' | 'missing' | 'error'>('active');

  useEffect(() => {
    // Simulate new log entries
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        message: 'Xử lý hoàn tất',
        status: 'success',
      };
      setLogs(prev => [...prev.slice(-9), newLog]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const displayedLogs = expanded ? logs.slice(-10) : logs.slice(-3);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-3.5 h-3.5 text-[#4CAF50]" />;
      case 'processing':
        return <Loader2 className="w-3.5 h-3.5 text-[#1E88E5] animate-spin" />;
      case 'error':
        return <span className="text-[#F44336] text-xs">✕</span>;
      default:
        return null;
    }
  };

  const getVlcStatusColor = () => {
    switch (vlcStatus) {
      case 'active': return '#4CAF50';
      case 'missing': return '#FF9800';
      case 'error': return '#F44336';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-[#0D0D0D] border border-[#3D3D3D] rounded shadow-2xl z-50">
      {/* Header */}
      <div className="h-10 px-3 flex items-center justify-between border-b border-[#3D3D3D]">
        <span className="text-xs font-semibold text-[#8A8A8A]">SYSTEM LOGS</span>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-[#1E1E1E] rounded transition-colors"
        >
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-[#8A8A8A]" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-[#8A8A8A]" />
          )}
        </button>
      </div>

      {/* Log Entries */}
      <div className={`overflow-y-auto ${expanded ? 'max-h-80' : 'max-h-24'} transition-all`}>
        <div className="p-2 space-y-2">
          {displayedLogs.map((log, idx) => (
            <div key={idx} className="flex items-start justify-between gap-2 px-2 py-1.5 hover:bg-[#1A1A1A] rounded text-xs font-mono">
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <span className="text-[#6B6B6B] flex-shrink-0">[{log.timestamp}]</span>
                <span className="text-[#B0B0B0] break-words">{log.message}</span>
              </div>
              <div className="flex-shrink-0">
                {getStatusIcon(log.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VLC Dependency Status Footer */}
      <div className="h-8 px-3 bg-[#0A0A0A] border-t border-[#3D3D3D] flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full animate-pulse"
          style={{
            backgroundColor: getVlcStatusColor(),
            boxShadow: `0 0 8px ${getVlcStatusColor()}`,
          }}
        />
        <span className="text-xs text-[#8A8A8A]">
          VLC Media Player: {vlcStatus === 'active' ? 'Active' : vlcStatus === 'missing' ? 'Missing' : 'Error'}
        </span>
      </div>
    </div>
  );
}
