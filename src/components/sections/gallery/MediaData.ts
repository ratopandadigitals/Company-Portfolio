export interface MediaItem {
  id: number
  type: 'image' | 'video'
  title: string
  url: string
  span: string
}

export const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: 'image',
    title: 'Astronaut',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-2'
  },
  {
    id: 2,
    type: 'image',
    title: 'Runner',
    url: 'https://images.unsplash.com/photo-1483721074892-4a85dd952f28?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 3,
    type: 'image',
    title: 'Galaxy',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-2'
  },
  {
    id: 4,
    type: 'image',
    title: 'Red Mountain',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 5,
    type: 'image',
    title: 'Explore vs Lock',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 6,
    type: 'image',
    title: 'Glass Cube',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 7,
    type: 'image',
    title: 'Night Hill',
    url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-2'
  },
  {
    id: 8,
    type: 'image',
    title: 'Dark Blue Blur',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 9,
    type: 'image',
    title: 'Orange Horizon',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 10,
    type: 'image',
    title: 'Blue Glow',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-1'
  },
  {
    id: 11,
    type: 'image',
    title: 'Black Hole',
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-2'
  },
  {
    id: 12,
    type: 'image',
    title: 'Blue Abstract',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    span: 'row-span-2'
  }
]