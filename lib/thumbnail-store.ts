import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThumbnailState {
  // Inputs
  thumbnailUrl: string | null;
  avatarUrl: string | null;
  title: string;
  username: string;
  viewCount: string;
  duration: string;
  publicationTime: string;
  description: string;

  // UI State
  theme: 'light' | 'dark' | 'auto';
  previewMode: 'home' | 'sidebar' | 'search' | 'compare';
  showBorder: boolean;

  // Actions
  setThumbnailUrl: (url: string | null) => void;
  setAvatarUrl: (url: string | null) => void;
  setTitle: (title: string) => void;
  setUsername: (username: string) => void;
  setViewCount: (count: string) => void;
  setDuration: (duration: string) => void;
  setPublicationTime: (time: string) => void;
  setDescription: (description: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  setPreviewMode: (mode: 'home' | 'sidebar' | 'search' | 'compare') => void;
  setShowBorder: (show: boolean) => void;
}

export const useThumbnailStore = create<ThumbnailState>()(
  persist(
    (set) => ({
      // Initial State
      thumbnailUrl: null,
      avatarUrl: null,
      title: 'My Awesome Video Title Goes Here',
      username: 'MyChannel',
      viewCount: '1.2M views',
      duration: '10:32',
      publicationTime: '2 days ago',
      description: 'This is my awesome video description. It can be a bit longer and give more details about the content of the video itself. What is it about? Who is in it? What will the viewer learn?',
      theme: 'auto',
      previewMode: 'home',
      showBorder: true,

      // Actions
      setThumbnailUrl: (url) => set({ thumbnailUrl: url }),
      setAvatarUrl: (url) => set({ avatarUrl: url }),
      setTitle: (title) => set({ title }),
      setUsername: (username) => set({ username }),
      setViewCount: (viewCount) => set({ viewCount }),
      setDuration: (duration) => set({ duration }),
      setPublicationTime: (publicationTime) => set({ publicationTime }),
      setDescription: (description) => set({ description }),
      setTheme: (theme) => set({ theme }),
      setPreviewMode: (previewMode) => set({ previewMode }),
      setShowBorder: (show) => set({ showBorder: show }),
    }),
    {
      name: 'thumbnail-preview-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      // Only persist the text fields
      partialize: (state) => ({
        title: state.title,
        username: state.username,
        viewCount: state.viewCount,
        duration: state.duration,
        publicationTime: state.publicationTime,
        description: state.description,
      }),
    }
  )
);
