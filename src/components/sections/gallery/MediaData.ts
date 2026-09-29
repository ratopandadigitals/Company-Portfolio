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
    url: '/galleryimage/one.jpg',
    span: 'row-span-2'
  },
  {
    id: 2,
    type: 'image',
    title: 'Runner',
    url: '/galleryimage/two.webp',
    span: 'row-span-1'
  },
  {
    id: 3,
    type: 'image',
    title: 'Galaxy',
    url: '/galleryimage/three.jpg',
    span: 'row-span-2'
  },
  {
    id: 4,
    type: 'image',
    title: 'Red Mountain',
    url: '/galleryimage/four.webp',
    span: 'row-span-1'
  },
  {
    id: 5,
    type: 'image',
    title: 'Explore vs Lock',
    url: '/galleryimage/five.jpg',
    span: 'row-span-1'
  },
  {
    id: 6,
    type: 'image',
    title: 'Glass Cube',
    url: '/galleryimage/six.jpg',
    span: 'row-span-1'
  },
  {
    id: 7,
    type: 'image',
    title: 'Night Hill',
    url: '/galleryimage/seven.jpg',
    span: 'row-span-2'
  },
  {
    id: 8,
    type: 'image',
    title: 'Dark Blue Blur',
    url: '/galleryimage/eight.jpg',
    span: 'row-span-1'
  },
  {
    id: 9,
    type: 'image',
    title: 'Orange Horizon',
    url: '/galleryimage/nine.webp',
    span: 'row-span-1'
  },
  {
    id: 10,
    type: 'image',
    title: 'Blue Glow',
    url: '/galleryimage/ten.jpg',
    span: 'row-span-1'
  },
  {
    id: 11,
    type: 'image',
    title: 'Black Hole',
    url: '/galleryimage/eleven.webp',
    span: 'row-span-2'
  },
  {
    id: 12,
    type: 'image',
    title: 'Blue Abstract',
    url: '/galleryimage/twelve.webp',
    span: 'row-span-2'
  }
]