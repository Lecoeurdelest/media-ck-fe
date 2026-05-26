import { Folder, Clock, Settings, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onSettingsClick?: () => void;
}

export function Sidebar({ onSettingsClick = () => {} }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const projects = [
    { name: 'Product Campaign 2024', path: '/projects/campaign-2024', active: true },
    { name: 'Summer Collection', path: '/projects/summer', active: false },
    { name: 'Brand Assets', path: '/projects/brand', active: false },
  ];

  const recentPaths = [
    'D:/Projects/VideoAutomation/Output',
    'C:/Users/Admin/Documents/Assets',
    '/home/user/workspace/videos',
  ];

  if (collapsed) {
    return (
      <div className="w-16 bg-[#F9FAFB] border-r border-[#E5E7EB] flex flex-col items-center py-4">
        <button
          onClick={() => setCollapsed(false)}
          className="p-2 hover:bg-[#F3F4F6] rounded"
        >
          <ChevronLeft className="w-5 h-5 rotate-180" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-60 bg-[#F9FAFB] border-r border-[#E5E7EB] flex flex-col">
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-[#E5E7EB]">
        <h2 className="font-semibold">Projects</h2>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 hover:bg-[#F3F4F6] rounded"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Project Directory Tree */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          <div className="text-xs font-medium text-[#6B7280] mb-2">CURRENT PROJECTS</div>
          <div className="space-y-1">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer ${
                  project.active
                    ? 'bg-white border-l-3 border-[#3B82F6] shadow-sm'
                    : 'hover:bg-[#F3F4F6]'
                }`}
              >
                <Folder className="w-4 h-4 text-[#6B7280]" />
                <span className="text-sm truncate">{project.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="p-3 border-t border-[#E5E7EB]">
          <div className="text-xs font-medium text-[#6B7280] mb-2">FOLDER CŨ (RECENT PATHS)</div>
          <div className="space-y-2">
            {recentPaths.map((path, idx) => (
              <div
                key={idx}
                className="group flex items-start gap-2 px-3 py-2 rounded hover:bg-[#F3F4F6] cursor-pointer"
                title={path}
              >
                <Clock className="w-4 h-4 text-[#6B7280] mt-0.5 flex-shrink-0" />
                <span className="text-xs text-[#6B7280] break-all line-clamp-2">{path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings Footer */}
      <button
        onClick={onSettingsClick}
        className="h-12 border-t border-[#E5E7EB] px-4 flex items-center gap-2 cursor-pointer hover:bg-[#F3F4F6] w-full transition-colors"
      >
        <Settings className="w-4 h-4 text-[#6B7280]" />
        <span className="text-sm text-[#6B7280]">Settings</span>
      </button>
    </div>
  );
}
