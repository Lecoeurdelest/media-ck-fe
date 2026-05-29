import { ASSETS } from '@/assets'
import { MoreVertical } from 'lucide-react'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

interface Asset {
  id: number
  thumbnail: string
  name: string
  path: string
  status: 'complete' | 'processing' | 'error'
  tags: string[]
  dimensions: string
  size: string
  format: string
}

interface DataTableProps {
  selectedAssets: number[]
  onSelectionChange: (ids: number[]) => void
  onImagePreview: (src: string) => void
  onVideoPreview: (src: string | null) => void
  activeMode: string
}

export function DataTable({ selectedAssets, onSelectionChange, onImagePreview }: DataTableProps) {
  const [assets] = useState<Asset[]>([
    {
      id: 1,
      thumbnail: ASSETS.image1,
      name: 'product-hero-001.jpg',
      path: 'D:/Projects/VideoAutomation/Output/2024-Q2/product-hero-001.jpg',
      status: 'complete',
      tags: ['Product', 'Hero'],
      dimensions: '1920×1080',
      size: '2.4 MB',
      format: 'JPG'
    },
    {
      id: 2,
      thumbnail: ASSETS.image2,
      name: 'lifestyle-shot-beach.png',
      path: 'C:/Users/Admin/Documents/Assets/Campaign/lifestyle-shot-beach.png',
      status: 'complete',
      tags: ['Lifestyle'],
      dimensions: '2560×1440',
      size: '4.1 MB',
      format: 'PNG'
    },
    {
      id: 3,
      thumbnail: ASSETS.image,
      name: 'detail-close-up.jpg',
      path: 'D:/Projects/VideoAutomation/Output/2024-Q2/detail-close-up.jpg',
      status: 'processing',
      tags: ['Detail'],
      dimensions: '1920×1080',
      size: '1.8 MB',
      format: 'JPG'
    },
    {
      id: 4,
      thumbnail: ASSETS.image,
      name: 'product-variant-red.webp',
      path: '/home/user/workspace/videos/renders/product-variant-red.webp',
      status: 'complete',
      tags: ['Product', 'Variant'],
      dimensions: '1080×1080',
      size: '890 KB',
      format: 'WP'
    },
    {
      id: 5,
      thumbnail: ASSETS.image,
      name: 'packaging-shot.jpg',
      path: 'D:/Projects/VideoAutomation/Output/2024-Q1/packaging-shot.jpg',
      status: 'error',
      tags: [],
      dimensions: '1920×1080',
      size: '2.1 MB',
      format: 'JPG'
    }
  ])

  const allSelected = assets.length > 0 && selectedAssets.length === assets.length
  const someSelected = selectedAssets.length > 0 && selectedAssets.length < assets.length

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange([])
    } else {
      onSelectionChange(assets.map((a) => a.id))
    }
  }

  const handleSelectOne = (id: number) => {
    if (selectedAssets.includes(id)) {
      onSelectionChange(selectedAssets.filter((i) => i !== id))
    } else {
      onSelectionChange([...selectedAssets, id])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-[#10B981]'
      case 'processing':
        return 'bg-[#3B82F6]'
      case 'error':
        return 'bg-[#EF4444]'
      default:
        return 'bg-[#6B7280]'
    }
  }

  return (
    <div className='flex flex-col h-full bg-white border border-[#E5E7EB] rounded overflow-hidden'>
      <Table className='border-collapse'>
        <TableHeader className='bg-[#F9FAFB] sticky top-0 z-10'>
          <TableRow className='border-b border-[#E5E7EB] hover:bg-[#F9FAFB]'>
            <TableHead className='w-12 px-3 py-3 text-xs font-medium text-[#6B7280]'>
              <input
                type='checkbox'
                checked={allSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = someSelected
                  }
                }}
                onChange={handleSelectAll}
                className='w-4 h-4 border-[#D1D5DB] rounded cursor-pointer'
              />
            </TableHead>
            <TableHead className='w-16 px-3 py-3 text-xs font-medium text-[#6B7280]'>Preview</TableHead>
            <TableHead className='min-w-max md:flex-1 px-3 py-3 text-xs font-medium text-[#6B7280]'>
              Asset Name
            </TableHead>
            <TableHead className='hidden lg:table-cell w-80 px-3 py-3 text-xs font-medium text-[#6B7280]'>
              File Path
            </TableHead>
            <TableHead className='w-24 px-3 py-3 text-xs font-medium text-[#6B7280]'>Status</TableHead>
            <TableHead className='w-32 px-3 py-3 text-xs font-medium text-[#6B7280]'>Tags</TableHead>
            <TableHead className='hidden lg:table-cell w-24 px-3 py-3 text-xs font-medium text-[#6B7280]'>
              Dimensions
            </TableHead>
            <TableHead className='hidden md:table-cell w-20 px-3 py-3 text-xs font-medium text-[#6B7280]'>
              Size
            </TableHead>
            <TableHead className='hidden lg:table-cell w-12 px-3 py-3 text-xs font-medium text-[#6B7280]'>
              Type
            </TableHead>
            <TableHead className='w-12 px-3 py-3'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='divide-y divide-[#E5E7EB]'>
          {assets.map((asset, idx) => (
            <TableRow
              key={asset.id}
              onClick={() => onImagePreview(asset.thumbnail)}
              className={`border-b border-[#E5E7EB] cursor-pointer transition-colors ${
                idx % 2 === 1 ? 'bg-[#F9FAFB]' : 'bg-white'
              } ${selectedAssets.includes(asset.id) ? 'bg-[#EFF6FF]' : ''} hover:bg-[#F3F4F6]`}
            >
              <TableCell className='w-12 px-3 py-2 text-center' onClick={(e) => e.stopPropagation()}>
                <input
                  type='checkbox'
                  checked={selectedAssets.includes(asset.id)}
                  onChange={() => handleSelectOne(asset.id)}
                  className='w-4 h-4 border-[#D1D5DB] rounded cursor-pointer'
                />
              </TableCell>
              <TableCell className='w-16 px-3 py-2'>
                <img src={asset.thumbnail} alt={asset.name} className='w-12 h-12 object-cover rounded' />
              </TableCell>
              <TableCell className='min-w-max md:flex-1 px-3 py-2 text-sm truncate font-mono'>{asset.name}</TableCell>
              <TableCell
                className='hidden lg:table-cell w-80 px-3 py-2 text-xs text-[#6B7280] truncate'
                title={asset.path}
              >
                {asset.path}
              </TableCell>
              <TableCell className='w-24 px-3 py-2'>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs text-white ${getStatusColor(asset.status)}`}
                >
                  <span className='w-1.5 h-1.5 rounded-full bg-white'></span>
                  {asset.status}
                </span>
              </TableCell>
              <TableCell className='w-32 px-3 py-2 flex gap-1'>
                {asset.tags.map((tag, i) => (
                  <span key={i} className='px-2 py-0.5 bg-[#E5E7EB] text-[#374151] text-xs rounded'>
                    {tag}
                  </span>
                ))}
              </TableCell>
              <TableCell className='hidden lg:table-cell w-24 px-3 py-2 text-sm font-mono text-[#6B7280]'>
                {asset.dimensions}
              </TableCell>
              <TableCell className='hidden md:table-cell w-20 px-3 py-2 text-sm font-mono text-[#6B7280]'>
                {asset.size}
              </TableCell>
              <TableCell className='hidden lg:table-cell w-12 px-3 py-2 text-xs font-semibold text-[#6B7280] opacity-40'>
                {asset.format}
              </TableCell>
              <TableCell className='w-12 px-3 py-2 text-center' onClick={(e) => e.stopPropagation()}>
                <button className='p-1 hover:bg-[#E5E7EB] rounded'>
                  <MoreVertical className='w-4 h-4 text-[#6B7280]' />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
