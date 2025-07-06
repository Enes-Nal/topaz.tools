import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';

const createDefaultThumbnail = () => ({
  id: nanoid(),
  thumbnailUrl: null,
  avatarUrl: null,
  title: 'My Awesome Video Title',
  username: 'MyChannel',
  viewCount: '1.2M views',
  duration: '10:32',
  publicationTime: '2 days ago',
  description: 'A great description of an awesome video.',
});

export const useCompareStore = create(
  persist(
    (set, get) => ({
      thumbnails: [createDefaultThumbnail()],
      activeThumbnailId: null,

      actions: {
        addThumbnail: () => {
          const newThumbnail = createDefaultThumbnail();
          set((state) => ({
            thumbnails: [...state.thumbnails, newThumbnail],
            activeThumbnailId: newThumbnail.id,
          }));
        },
        removeThumbnail: (id) => {
          set((state) => ({
            thumbnails: state.thumbnails.filter((t) => t.id !== id),
            activeThumbnailId: state.activeThumbnailId === id ? state.thumbnails[0]?.id || null : state.activeThumbnailId,
          }));
        },
        setActiveThumbnailId: (id) => set({ activeThumbnailId: id }),
        updateActiveThumbnail: (field, value) => {
          set((state) => {
            const activeId = state.activeThumbnailId || state.thumbnails[0]?.id;
            if (!activeId) return {};

            return {
              thumbnails: state.thumbnails.map((t) =>
                t.id === activeId ? { ...t, [field]: value } : t
              ),
            };
          });
        },
      },
    }),
    {
      name: 'thumbnail-compare-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        thumbnails: state.thumbnails,
        activeThumbnailId: state.activeThumbnailId,
      }),
    }
  )
);

export const useActiveThumbnail = () => {
  const store = useCompareStore();
  const activeId = store.activeThumbnailId || store.thumbnails[0]?.id;
  const activeThumbnail = store.thumbnails.find(t => t.id === activeId);
  const { updateActiveThumbnail } = store.actions;

  const setters = {
    setTitle: (value) => updateActiveThumbnail('title', value),
    setUsername: (value) => updateActiveThumbnail('username', value),
    setViewCount: (value) => updateActiveThumbnail('viewCount', value),
    setDuration: (value) => updateActiveThumbnail('duration', value),
    setPublicationTime: (value) => updateActiveThumbnail('publicationTime', value),
    setDescription: (value) => updateActiveThumbnail('description', value),
    setThumbnailUrl: (value) => updateActiveThumbnail('thumbnailUrl', value),
    setAvatarUrl: (value) => updateActiveThumbnail('avatarUrl', value),
  };

  return { ...activeThumbnail, ...setters, actions: store.actions, allThumbnails: store.thumbnails, activeId };
};
