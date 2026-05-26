import { X, Download, Maximize2 } from 'lucide-react';

interface ImagePreviewProps {
  imageSrc: string | null;
}

export function ImagePreview({ imageSrc }: ImagePreviewProps) {
  if (!imageSrc) {
    return (
      <div className="w-full h-80 bg-[#F9FAFB] border border-[#E5E7EB] rounded flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-[#E5E7EB] rounded-lg flex items-center justify-center">
            <Maximize2 className="w-8 h-8 text-[#9CA3AF]" />
          </div>
          <p className="text-sm text-[#6B7280]">Image Preview</p>
          <p className="text-xs text-[#9CA3AF] mt-1">Click an asset to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border border-[#E5E7EB] rounded shadow-sm overflow-hidden">
      {/* Header */}
      <div className="h-10 bg-[#F9FAFB] border-b border-[#E5E7EB] px-3 flex items-center justify-between">
        <span className="text-sm font-medium text-[#374151]">Image Preview</span>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-[#E5E7EB] rounded">
            <Download className="w-4 h-4 text-[#6B7280]" />
          </button>
          <button className="p-1 hover:bg-[#E5E7EB] rounded">
            <Maximize2 className="w-4 h-4 text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Image Container - 1:1 Aspect Ratio */}
      <div className="aspect-square bg-[#000000] flex items-center justify-center">
        <img
          src={imageSrc}
          alt="Preview"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Metadata */}
      <div className="p-3 bg-[#F9FAFB] border-t border-[#E5E7EB]">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[#6B7280]">Format:</span>
            <span className="ml-1 font-mono">PNG</span>
          </div>
          <div>
            <span className="text-[#6B7280]">Size:</span>
            <span className="ml-1 font-mono">2.4 MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
