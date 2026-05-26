import { Play, Pause, Volume2, Maximize2, Download, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';

interface VideoPreviewProps {
  videoSrc: string | null;
}

export function VideoPreview({ videoSrc }: VideoPreviewProps) {
  const [playing, setPlaying] = useState(false);
  const [showVlcWarning] = useState(true);

  if (!videoSrc) {
    return (
      <div className="w-full bg-white border border-[#E5E7EB] rounded shadow-sm">
        {/* Header */}
        <div className="h-10 bg-[#F9FAFB] border-b border-[#E5E7EB] px-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#374151]">Video Preview</span>
            {showVlcWarning && (
              <div className="group relative">
                <Info className="w-4 h-4 text-[#3B82F6] cursor-help" />
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-[#1F2937] text-white text-xs rounded shadow-lg z-10">
                  VLC Media Player required for frame-accurate playback.
                  <a href="#" className="underline ml-1">Download VLC</a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Placeholder */}
        <div className="aspect-video bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-[#E5E7EB] rounded-lg flex items-center justify-center">
              <Play className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <p className="text-sm text-[#6B7280]">No video generated yet</p>
            <p className="text-xs text-[#9CA3AF] mt-1">Create a video to preview</p>
          </div>
        </div>

        {/* VLC Requirement Notice */}
        {showVlcWarning && (
          <div className="p-3 bg-[#EFF6FF] border-t border-[#BFDBFE] flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-[#1E40AF]">
              <span className="font-medium">System Requirement:</span> Video Preview requires VLC Media Player installed on your machine.{' '}
              <a href="#" className="underline hover:text-[#1E3A8A]">Download VLC</a>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded shadow-sm overflow-hidden">
      {/* Header */}
      <div className="h-10 bg-[#F9FAFB] border-b border-[#E5E7EB] px-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[#374151]">Video Preview</span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-[#E5E7EB] rounded">
            <Download className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Video Player - 16:9 Aspect Ratio */}
      <div className="relative aspect-video bg-[#000000]">
        <video
          src={videoSrc}
          className="w-full h-full"
          onClick={() => setPlaying(!playing)}
        />

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black/80 flex items-center px-3 gap-2">
          <button
            onClick={() => setPlaying(!playing)}
            className="p-1 hover:bg-white/10 rounded"
          >
            {playing ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Play className="w-4 h-4 text-white" />
            )}
          </button>

          {/* Timeline */}
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-[#3B82F6]"></div>
          </div>

          <span className="text-xs text-white font-mono">0:03 / 0:12</span>

          <button className="p-1 hover:bg-white/10 rounded">
            <Volume2 className="w-4 h-4 text-white" />
          </button>

          <button className="p-1 hover:bg-white/10 rounded">
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="p-3 bg-[#F9FAFB] border-t border-[#E5E7EB] flex items-center gap-2">
        <span className="text-xs text-[#6B7280]">Speed:</span>
        <select className="h-7 px-2 border border-[#D1D5DB] rounded text-xs bg-white">
          <option>0.25x</option>
          <option>0.5x</option>
          <option selected>1x</option>
          <option>1.5x</option>
          <option>2x</option>
        </select>
        <button className="h-7 px-2 border border-[#D1D5DB] rounded text-xs hover:bg-white">
          Frame ←
        </button>
        <button className="h-7 px-2 border border-[#D1D5DB] rounded text-xs hover:bg-white">
          Frame →
        </button>
      </div>
    </div>
  );
}
