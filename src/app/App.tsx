import { useState } from 'react';
import { VideoPreview } from './components/VideoPreview';
import { ImagePreview } from './components/ImagePreview';
import { DataTable } from './components/DataTable';
import { FilterToolbar } from './components/FilterToolbar';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { NewProjectInput } from './components/NewProjectInput';
import { SettingsPanel } from './components/SettingsPanel';
import { SystemLogs } from './components/SystemLogs';

export default function App() {
  const [selectedAssets, setSelectedAssets] = useState<number[]>([]);
  const [activeMode, setActiveMode] = useState<'tagging' | 'download' | 'filtering' | 'video'>('tagging');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="size-full flex bg-white">
      {/* Left Sidebar */}
      <Sidebar onSettingsClick={() => setIsSettingsOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* New Project Input */}
        <NewProjectInput />

        {/* Filter & Action Toolbar */}
        <FilterToolbar
          activeMode={activeMode}
          onModeChange={setActiveMode}
          selectedCount={selectedAssets.length}
        />

        {/* Main Content Grid */}
        <div className="flex-1 flex gap-4 p-4 overflow-hidden">
          {/* Center Stage Hub - Data Table */}
          <div className="flex-1 flex flex-col gap-4 overflow-hidden">
            <DataTable
              selectedAssets={selectedAssets}
              onSelectionChange={setSelectedAssets}
              onImagePreview={setPreviewImage}
              onVideoPreview={setPreviewVideo}
              activeMode={activeMode}
            />
          </div>

          {/* Right Preview Panel */}
          <div className="w-80 flex flex-col gap-4">
            <ImagePreview imageSrc={previewImage} />
            <VideoPreview videoSrc={previewVideo} />
          </div>
        </div>

        {/* Status & Notification Bar */}
        <StatusBar />
      </div>

      {/* Settings Modal */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* System Logs - Always visible */}
      <SystemLogs />
    </div>
  );
}
