import React from 'react';

export default function CategoryCardSkeleton() {
  return (
    <div className="bg-white border border-light-beige rounded-2xl overflow-hidden animate-pulse">
      {/* Thumbnail */}
      <div className="aspect-[4/3] w-full bg-soft-beige/60" />

      {/* Info */}
      <div className="p-5 sm:p-6 space-y-2.5">
        <div className="h-6 bg-soft-beige rounded w-2/3" />
        <div className="h-4 bg-soft-beige rounded w-full" />
        <div className="h-4 bg-soft-beige rounded w-1/3 pt-1" />
      </div>
    </div>
  );
}
