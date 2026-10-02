"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Section from '@/components/atoms/Section'
import Container from '@/components/atoms/Container'
import { mediaItems as initialMediaItems } from './MediaData'
import Image from 'next/image'
import useDialogFocus from '@/components/hooks/useDialogFocus'

export interface MediaItemType {
  id: number;
  type: 'image' | 'video' | string;
  title: string;
  desc?: string;
  url: string;
  span: string;
}

// MediaItem renders video or image with scroll detection & smooth hover zoom
const MediaItem = ({
  item,
  className = '',
  onClick
}: {
  item: MediaItemType;
  className?: string;
  onClick?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);

  useEffect(() => {
    if (item.type !== 'video') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [item.type]);

  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return;
    let mounted = true;

    const handleVideoPlay = async () => {
      if (!isInView || !mounted || !videoRef.current) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setIsBuffering(false);
          await videoRef.current.play();
        } else {
          setIsBuffering(true);
          videoRef.current.oncanplay = async () => {
            if (mounted && videoRef.current) {
              setIsBuffering(false);
              await videoRef.current.play();
            }
          };
        }
      } catch (error) {
        console.warn("Autoplay blocked/failed:", error);
      }
    };

    if (isInView) {
      handleVideoPlay();
    } else {
      videoRef.current.pause();
    }

    return () => {
      mounted = false;
    };
  }, [isInView, item.type]);

  if (item.type === 'video') {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <video
          ref={videoRef}
          src={item.url}
          onClick={onClick}
          playsInline
          muted
          loop
          preload="auto"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }

  return (
    <Image
      src={item.url}
      alt={item.title || 'Gallery item'}
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      onClick={onClick}
      loading="eager"
      decoding="async"
      className={`object-cover transition-transform duration-500 ease-out group-hover:scale-110 ${className}`}
    />
  );
};

// Fullscreen Modal Lightbox with Floating Interactive Dock
const GalleryModal = ({
  selectedItem,
  isOpen,
  onClose,
  setSelectedItem,
  mediaItems
}: {
  selectedItem: MediaItemType;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: MediaItemType | null) => void;
  mediaItems: MediaItemType[];
}) => {
  const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });
  const dialogRef = useDialogFocus<HTMLDivElement>(isOpen, onClose)

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gallery-dialog-title"
    >
      {/* Background Overlay over Bento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md z-40"
      />

      {/* Main Expanded Modal Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="relative w-full max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden z-50 bg-neutral-900/60 border border-white/10 shadow-2xl flex flex-col items-center justify-center"
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedItem.id}
              className="relative w-full aspect-video max-h-[65vh] rounded-xl overflow-hidden shadow-lg bg-black/40"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MediaItem item={selectedItem} className="w-full h-full" />
              {(selectedItem.title || selectedItem.desc) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 id="gallery-dialog-title" className="text-white text-lg font-semibold">
                    {selectedItem.title || 'Gallery preview'}
                  </h3>
                  {selectedItem.desc && (
                    <p className="text-white/80 text-sm mt-1">{selectedItem.desc}</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Close Button */}
        <motion.button
          type="button"
          aria-label="Close gallery preview"
          className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-50 border border-white/10"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Draggable Bottom Thumbnail Dock */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        animate={{ x: dockPosition.x, y: dockPosition.y }}
        onDragEnd={(_, info) => {
          setDockPosition(prev => ({
            x: prev.x + info.offset.x,
            y: prev.y + info.offset.y
          }));
        }}
        className="fixed z-50 left-1/2 bottom-6 -translate-x-1/2 touch-none"
      >
        <div className="rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl p-2 flex items-center gap-2">
          {mediaItems.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title || 'gallery item'}`}
              aria-pressed={selectedItem.id === item.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(item);
              }}
              className={`
                relative w-10 h-10 rounded-lg border-0 p-0 text-left overflow-hidden cursor-pointer group shrink-0
                ${selectedItem.id === item.id ? 'ring-2 ring-white shadow-lg' : 'opacity-60 hover:opacity-100'}
              `}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <MediaItem item={item} className="w-full h-full" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function BentoGallery() {
  const [items, setItems] = useState<MediaItemType[]>(initialMediaItems);
  const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Section>
      <Container>
        {/* Bento Grid */}
        <motion.div
       id="bento-gallery"
        className="grid grid-cols-4 auto-rows-[160px] gap-3 w-full scroll-mt-28"          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              type="button"
              aria-haspopup="dialog"
              aria-label={`Open ${item.title || 'gallery item'}`}
              layoutId={`media-${item.id}`}
              className={`group relative overflow-hidden rounded-xl border-0 p-0 text-left bg-neutral-900 cursor-pointer ${item.span}`}
              onClick={() => !isDragging && setSelectedItem(item)}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -4 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                const moveDistance = info.offset.x + info.offset.y;
                if (Math.abs(moveDistance) > 60) {
                  const newItems = [...items];
                  const draggedItem = newItems[index];
                  const targetIndex = moveDistance > 0
                    ? Math.min(index + 1, items.length - 1)
                    : Math.max(index - 1, 0);
                  newItems.splice(index, 1);
                  newItems.splice(targetIndex, 0, draggedItem);
                  setItems(newItems);
                }
              }}
            >
              {/* Media Element with Zoom on Hover */}
              <MediaItem
                item={item}
                className="w-full h-full"
              />

              {/* Hover Text Banner */}
              {(item.title || item.desc) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 pointer-events-none">
                  {item.title && (
                    <h3 className="text-white text-sm font-semibold line-clamp-1">{item.title}</h3>
                  )}
                  {item.desc && (
                    <p className="text-white/70 text-xs mt-0.5 line-clamp-1">{item.desc}</p>
                  )}
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Modal Lightbox Popup */}
        {selectedItem && (
          <GalleryModal
            selectedItem={selectedItem}
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={items}
          />
        )}
      </Container>
    </Section>
  )
}