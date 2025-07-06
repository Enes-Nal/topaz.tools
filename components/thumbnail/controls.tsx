'use client';
import { useThumbnailStore } from '@/lib/thumbnail-store';
import { useActiveThumbnail } from '@/lib/compare-store';
import { useCallback } from 'react';
import { Plus, X, UploadCloud, Image as ImageIcon, Text as TextIcon, User, Eye, Clock, Calendar, FileText, Square, Box } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

const RED = 'text-red-500';

const InputField = ({ label, value, onChange, type = "text", icon }) => (
  <div className="flex flex-col gap-1.5 items-center w-full">
    <label className="text-sm font-medium text-gray-600 dark:text-[#b3b8c5] flex items-center gap-1 justify-center">
      {icon && <span className={RED}>{icon}</span>}
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white dark:bg-[#23232a] border border-gray-300 dark:border-[#23232a] rounded-lg px-3 py-2 text-gray-800 dark:text-[#e5e7eb] font-mono text-sm focus:border-red-500 focus:outline-none w-full max-w-xs text-center"
    />
  </div>
);

const ToggleField = ({ label, checked, onChange, icon }) => (
  <div className="flex flex-col gap-1.5 items-center w-full">
    <label className="text-sm font-medium text-gray-600 dark:text-[#b3b8c5] flex items-center gap-1 justify-center">
      {icon && <span className={RED}>{icon}</span>}
      {label}
    </label>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

function DropzoneInput({ onFileSelect }) {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles[0]) {
      onFileSelect(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.jpg', '.gif', '.webp'] },
    multiple: false,
  });

  return (
    <div {...getRootProps()} className={`
      border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
      text-gray-500 dark:text-gray-400
      border-red-400 dark:border-red-600
      hover:border-red-500 hover:text-red-500
      dark:hover:border-red-400 dark:hover:text-red-400
      ${isDragActive ? 'border-red-500 bg-red-50 dark:bg-red-950' : ''}
      w-full max-w-xs mx-auto
    `}>
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadCloud size={32} className={RED} />
        {isDragActive ?
          <p>Drop the image here...</p> :
          <p>Drag & drop or click to upload</p>
        }
      </div>
    </div>
  );
}

export function ThumbnailControls() {
  const { previewMode } = useThumbnailStore();

  if (previewMode === 'compare') {
    return <CompareControls />;
  }
  return <DefaultControls />;
}

function DefaultControls() {
  const {
    title, setTitle,
    username, setUsername,
    viewCount, setViewCount,
    duration, setDuration,
    publicationTime, setPublicationTime,
    thumbnailUrl, setThumbnailUrl,
    avatarUrl, setAvatarUrl,
    description, setDescription,
    showBorder, setShowBorder,
  } = useThumbnailStore();

  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h1 className="text-xl font-bold text-red-500 mb-2 text-center">Thumbnail Previewer</h1>
      <ControlInputs
        data={{title, username, viewCount, duration, publicationTime, thumbnailUrl, avatarUrl, description, showBorder}}
        setters={{setTitle, setUsername, setViewCount, setDuration, setPublicationTime, setThumbnailUrl, setAvatarUrl, setDescription, setShowBorder}}
      />
    </div>
  )
}

function CompareControls() {
  const { allThumbnails, actions, activeId, ...activeThumbnailSetters } = useActiveThumbnail();

  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-red-500 mb-2 text-center">Compare Mode</h1>
        <button onClick={actions.addThumbnail} className="flex items-center gap-1 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 font-semibold px-3 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-800">
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-[#23232a] pb-4 w-full justify-center">
        {allThumbnails.map((thumb, index) => (
          <button
            key={thumb.id}
            onClick={() => actions.setActiveThumbnailId(thumb.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md ${activeId === thumb.id ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-[#23232a] text-gray-700 dark:text-gray-300'}`}
          >
            <span>Variation {index + 1}</span>
            {allThumbnails.length > 1 && (
              <X onClick={(e) => { e.stopPropagation(); actions.removeThumbnail(thumb.id); }} size={14} className="hover:text-red-500" />
            )}
          </button>
        ))}
      </div>
      <ControlInputs data={activeThumbnailSetters} setters={activeThumbnailSetters} />
    </div>
  )
}

function ControlInputs({ data, setters }) {
  // data and setters have the same keys, just different values (the state and the function to update it)
  return (
    <>
      <div className="space-y-4 pt-4 mt-6 pb-4 flex flex-col items-center w-full">
        <h3 className={`text-base font-semibold ${RED} flex items-center gap-2 mb-2 justify-center`}><ImageIcon size={18} className={RED} /> Images</h3>
        <InputField label="Thumbnail Image URL" value={data.thumbnailUrl || ''} onChange={setters.setThumbnailUrl} icon={<ImageIcon size={14} className={RED} />} />
        <DropzoneInput onFileSelect={setters.setThumbnailUrl} />
        <div className="pt-4"></div>
        <InputField label="Avatar Image URL" value={data.avatarUrl || ''} onChange={setters.setAvatarUrl} icon={<User size={14} className={RED} />} />
        <DropzoneInput onFileSelect={setters.setAvatarUrl} />
      </div>
      <div className="space-y-4 mt-6 pt-6 pb-4 flex flex-col items-center w-full">
        <h3 className={`text-base font-semibold ${RED} flex items-center gap-2 mb-2 justify-center`}><TextIcon size={18} className={RED} /> Text Content</h3>
        <InputField label="Video Title" value={data.title} onChange={setters.setTitle} icon={<FileText size={14} className={RED} />} />
        <div className="flex flex-col gap-1.5 items-center w-full">
          <label className="text-sm font-medium text-gray-600 dark:text-[#b3b8c5] flex items-center gap-1 justify-center"><FileText size={14} className={RED} /> Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setters.setDescription(e.target.value)}
            className="bg-white dark:bg-[#23232a] border border-gray-300 dark:border-[#23232a] rounded-lg px-3 py-2 text-gray-800 dark:text-[#e5e7eb] font-mono text-sm focus:border-red-500 focus:outline-none h-24 resize-none w-full max-w-xs text-center"
          />
        </div>
        <InputField label="Channel Username" value={data.username} onChange={setters.setUsername} icon={<User size={14} className={RED} />} />
        <InputField label="View Count" value={data.viewCount} onChange={setters.setViewCount} icon={<Eye size={14} className={RED} />} />
        <InputField label="Video Duration" value={data.duration} onChange={setters.setDuration} icon={<Clock size={14} className={RED} />} />
        <InputField label="Publication Time" value={data.publicationTime} onChange={setters.setPublicationTime} icon={<Calendar size={14} className={RED} />} />
      </div>
      <div className="space-y-4 mt-6 pt-6 pb-4 flex flex-col items-center w-full">
        <h3 className={`text-base font-semibold ${RED} flex items-center gap-2 mb-2 justify-center`}><Square size={18} className={RED} /> Display Options</h3>
        <ToggleField label="Show Red Border" checked={data.showBorder} onChange={setters.setShowBorder} icon={<Box size={14} className={RED} />} />
      </div>
    </>
  )
}
