import { useState } from 'react';
import { MoreVertical, Tag, Download, Trash2 } from 'lucide-react';
import sampleImage from '../../imports/image.png';

interface Asset {
  id: number;
  thumbnail: string;
  name: string;
  path: string;
  status: 'complete' | 'processing' | 'error';
  tags: string[];
  dimensions: string;
  size: string;
  format: string;
}

interface DataTableProps {
  selectedAssets: number[];
  onSelectionChange: (ids: number[]) => void;
  onImagePreview: (src: string) => void;
  onVideoPreview: (src: string | null) => void;
  activeMode: string;
}

export function DataTable({ selectedAssets, onSelectionChange, onImagePreview, onVideoPreview, activeMode }: DataTableProps) {
  const [assets] = useState<Asset[]>([
    {
      id: 1,
      thumbnail: sampleImage,
      name: 'product-hero-001.jpg',
      path: 'D:/Projects/VideoAutomation/Output/2024-Q2/product-hero-001.jpg',
      status: 'complete',
      tags: ['Product', 'Hero'],
      dimensions: '1920×1080',
      size: '2.4 MB',
      format: 'JPG',
    },
    {
      id: 2,
      thumbnail: sampleImage,
      name: 'lifestyle-shot-beach.png',
      path: 'C:/Users/Admin/Documents/Assets/Campaign/lifestyle-shot-beach.png',
      status: 'complete',
      tags: ['Lifestyle'],
      dimensions: '2560×1440',
      size: '4.1 MB',
      format: 'PNG',
    },
    {
      id: 3,
      thumbnail: sampleImage,
      name: 'detail-close-up.jpg',
      path: 'D:/Projects/VideoAutomation/Output/2024-Q2/detail-close-up.jpg',
      status: 'processing',
      tags: ['Detail'],
      dimensions: '1920×1080',
      size: '1.8 MB',
      format: 'JPG',
    },
    {
      id: 4,
      thumbnail: sampleImage,
      name: 'product-variant-red.webp',
      path: '/home/user/workspace/videos/renders/product-variant-red.webp',
      status: 'complete',
      tags: ['Product', 'Variant'],
      dimensions: '1080×1080',
      size: '890 KB',
      format: 'WP',
    },
    {
      id: 5,
      thumbnail: sampleImage,
      name: 'packaging-shot.jpg',
      path: 'D:/Projects/VideoAutomation/Output/2024-Q1/packaging-shot.jpg',
      status: 'error',
      tags: [],
      dimensions: '1920×1080',
      size: '2.1 MB',
      format: 'JPG',
    },
  ]);

  const allSelected = assets.length > 0 && selectedAssets.length === assets.length;
  const someSelected = selectedAssets.length > 0 && selectedAssets.length < assets.length;

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([]);
    } else {
      onSelectionChange(assets.map(a => a.id));
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedAssets.includes(id)) {
      onSelectionChange(selectedAssets.filter(i => i !== id));
    } else {
      onSelectionChange([...selectedAssets, id]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-[#10B981]';
      case 'processing': return 'bg-[#3B82F6]';
      case 'error': return 'bg-[#EF4444]';
      default: return 'bg-[#6B7280]';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-[#E5E7EB] rounded overflow-hidden">
      {/* Table Header */}
      <div className="h-16 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center px-4 gap-4 flex-shrink-0">
        <div className="w-12 flex items-center justify-center">
          <input
            type="checkbox"
            checked={allSelected}
            ref={input => {
              if (input) {
                input.indeterminate = someSelected;
              }
            }}
            onChange={handleSelectAll}
            className="w-4 h-4 border-[#D1D5DB] rounded cursor-pointer"
          />
        </div>
        <div className="w-16 text-xs font-medium text-[#6B7280]">Preview</div>
        <div className="flex-1 text-xs font-medium text-[#6B7280]">Asset Name</div>
        <div className="w-80 text-xs font-medium text-[#6B7280]">File Path</div>
        <div className="w-24 text-xs font-medium text-[#6B7280]">Status</div>
        <div className="w-32 text-xs font-medium text-[#6B7280]">Tags</div>
        <div className="w-24 text-xs font-medium text-[#6B7280]">Dimensions</div>
        <div className="w-20 text-xs font-medium text-[#6B7280]">Size</div>
        <div className="w-12 text-xs font-medium text-[#6B7280]">Type</div>
        <div className="w-12"></div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto">
        {assets.map((asset, idx) => (
          <div
            key={asset.id}
            className={`h-16 flex items-center px-4 gap-4 border-b border-[#E5E7EB] ${
              idx % 2 === 1 ? 'bg-[#F9FAFB]' : 'bg-white'
            } ${selectedAssets.includes(asset.id) ? 'bg-[#EFF6FF]' : ''} hover:bg-[#F3F4F6] cursor-pointer`}
            onClick={() => onImagePreview(asset.thumbnail)}
          >
            <div className="w-12 flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={selectedAssets.includes(asset.id)}
                onChange={() => handleSelectOne(asset.id)}
                className="w-4 h-4 border-[#D1D5DB] rounded cursor-pointer"
              />
            </div>
            <div className="w-16">
              <img src={asset.thumbnail} alt={asset.name} className="w-12 h-12 object-cover rounded" />
            </div>
            <div className="flex-1 text-sm truncate font-mono">{asset.name}</div>
            <div className="w-80 text-xs text-[#6B7280] truncate" title={asset.path}>
              {asset.path}
            </div>
            <div className="w-24">
              <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs text-white ${getStatusColor(asset.status)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                {asset.status}
              </span>
            </div>
            <div className="w-32 flex gap-1">
              {asset.tags.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 bg-[#E5E7EB] text-[#374151] text-xs rounded">
                  {tag}
                </span>
              ))}
            </div>
            <div className="w-24 text-sm font-mono text-[#6B7280]">{asset.dimensions}</div>
            <div className="w-20 text-sm font-mono text-[#6B7280]">{asset.size}</div>
            <div className="w-12 text-xs font-semibold text-[#6B7280] opacity-40">{asset.format}</div>
            <div className="w-12 flex items-center justify-center" onClick={e => e.stopPropagation()}>
              <button className="p-1 hover:bg-[#E5E7EB] rounded">
                <MoreVertical className="w-4 h-4 text-[#6B7280]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
