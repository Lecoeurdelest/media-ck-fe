import { Download, Filter, Tag, Video } from 'lucide-react'

interface FilterToolbarProps {
  activeMode: 'tagging' | 'download' | 'filtering' | 'video'
  onModeChange: (mode: 'tagging' | 'download' | 'filtering' | 'video') => void
  selectedCount: number
}

export function FilterToolbar({ activeMode, onModeChange, selectedCount }: FilterToolbarProps) {
  const modes = [
    { id: 'tagging' as const, label: 'Tagging', icon: Tag },
    { id: 'download' as const, label: 'Image Download', icon: Download },
    { id: 'filtering' as const, label: 'Image Filtering', icon: Filter },
    { id: 'video' as const, label: 'Video Processing', icon: Video }
  ]

  return (
    <div className='bg-white border-b border-[#E5E7EB]'>
      {/* Tab Bar */}
      <div className='h-12 flex overflow-x-auto'>
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`flex items-center justify-center gap-1 md:gap-2 border-b-3 transition-colors flex-shrink-0 px-2 md:px-4 ${
                activeMode === mode.id
                  ? 'border-[#3B82F6] font-semibold text-[#1F2937]'
                  : 'border-transparent font-normal text-[#6B7280] hover:bg-[#F9FAFB]'
              }`}
            >
              <Icon className='w-4 h-4' />
              <span className='text-xs md:text-sm'>{mode.label}</span>
            </button>
          )
        })}
      </div>

      {/* Mode-Specific Controls */}
      <div className='px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] overflow-x-auto'>
        {activeMode === 'tagging' && (
          <div className='flex items-center gap-2 md:gap-4 flex-wrap'>
            <select className='h-10 px-3 border border-[#D1D5DB] rounded text-sm bg-white'>
              <option>All Tags</option>
              <option>Product Images</option>
              <option>Lifestyle</option>
              <option>Detail Shots</option>
            </select>
            <button className='h-10 px-4 border border-[#D1D5DB] rounded text-sm hover:bg-white flex-shrink-0'>
              Add Tag
            </button>
            {selectedCount > 0 && <span className='text-xs md:text-sm text-[#6B7280]'>{selectedCount} selected</span>}
          </div>
        )}

        {activeMode === 'download' && (
          <div className='flex items-center gap-2 md:gap-4 flex-wrap'>
            <select className='h-10 px-3 border border-[#D1D5DB] rounded text-sm bg-white'>
              <option>High Quality (1920px)</option>
              <option>Medium Quality (1280px)</option>
              <option>Low Quality (640px)</option>
            </select>
            <select className='h-10 px-3 border border-[#D1D5DB] rounded text-sm bg-white'>
              <option>Format: JPG</option>
              <option>Format: PNG</option>
              <option>Format: WebP</option>
            </select>
            <button className='h-10 px-2 md:px-4 bg-[#3B82F6] text-white rounded text-sm font-medium hover:bg-[#2563EB] flex-shrink-0 whitespace-nowrap'>
              Download ({selectedCount})
            </button>
          </div>
        )}

        {activeMode === 'filtering' && (
          <div className='flex items-center gap-2 md:gap-4 flex-wrap'>
            <div className='flex items-center gap-1 md:gap-2 flex-shrink-0'>
              <label className='text-xs md:text-sm text-[#6B7280] hidden md:block'>Min Resolution:</label>
              <input type='number' placeholder='W' className='w-16 h-10 px-2 border border-[#D1D5DB] rounded text-sm' />
              <span className='text-[#6B7280]'>×</span>
              <input type='number' placeholder='H' className='w-16 h-10 px-2 border border-[#D1D5DB] rounded text-sm' />
            </div>
            <select className='h-10 px-2 md:px-3 border border-[#D1D5DB] rounded text-sm bg-white'>
              <option>1:1</option>
              <option>4:3</option>
              <option>16:9</option>
            </select>
            <button className='h-10 px-2 md:px-4 bg-[#3B82F6] text-white rounded text-sm font-medium hover:bg-[#2563EB] flex-shrink-0'>
              Apply
            </button>
            <button className='h-10 px-2 md:px-4 border border-[#D1D5DB] rounded text-sm hover:bg-white flex-shrink-0'>
              Reset
            </button>
          </div>
        )}

        {activeMode === 'video' && (
          <div className='flex items-center gap-4'>
            <select className='h-10 px-3 border border-[#D1D5DB] rounded text-sm bg-white'>
              <option>Template: Product Showcase</option>
              <option>Template: Slideshow</option>
              <option>Template: Grid Animation</option>
            </select>
            <div className='flex items-center gap-2'>
              <label className='text-sm text-[#6B7280]'>Duration per image:</label>
              <input
                type='number'
                defaultValue='3'
                className='w-16 h-10 px-2 border border-[#D1D5DB] rounded text-sm'
              />
              <span className='text-sm text-[#6B7280]'>sec</span>
            </div>
            <button
              disabled={selectedCount === 0}
              className='h-10 px-4 bg-[#3B82F6] text-white rounded text-sm font-medium hover:bg-[#2563EB] disabled:bg-[#9CA3AF] disabled:cursor-not-allowed flex items-center gap-2'
            >
              <Video className='w-4 h-4' />
              Create Video ({selectedCount} images)
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
