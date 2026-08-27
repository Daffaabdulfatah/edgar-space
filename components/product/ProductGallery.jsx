'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getImageUrl } from '@/libs/api';

/**
 * Responsive Product Image Gallery
 * @param {{ images?: string[], thumbnail?: string, productName: string }} props 
 */
export default function ProductGallery({ images = [], thumbnail = null, productName = 'Produk' }) {
  // Normalize gallery images array
  let galleryList = Array.isArray(images) && images.length > 0 ? images : [];
  if (galleryList.length === 0 && thumbnail) {
    galleryList = [thumbnail];
  }
  if (galleryList.length === 0) {
    galleryList = ['/images/placeholder.svg'];
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = galleryList[activeIndex] || galleryList[0];

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Image Container */}
      <div className="relative aspect-square w-full bg-white rounded-2xl border border-light-beige overflow-hidden p-6 sm:p-10 flex items-center justify-center shadow-subtle">
        <Image
          src={getImageUrl(activeImage)}
          alt={`${productName} - Gambar ${activeIndex + 1}`}
          fill
          priority
          className="object-contain p-4 sm:p-6 transition-all duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails strip */}
      {galleryList.length > 1 && (
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin">
          {galleryList.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Lihat gambar ke-${idx + 1}`}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border bg-white overflow-hidden shrink-0 transition-all p-1.5 cursor-pointer ${
                  isSelected
                    ? 'border-deep-olive ring-2 ring-deep-olive/20 shadow-xs'
                    : 'border-light-beige hover:border-warm-gray opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="80px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
