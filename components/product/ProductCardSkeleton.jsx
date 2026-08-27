import React from 'react';

export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col h-full bg-white border border-light-beige rounded-2xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-soft-beige/60" />

      {/* Details Skeleton */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-soft-beige rounded w-3/4" />
          <div className="h-4 bg-soft-beige rounded w-1/2" />
        </div>

        <div className="pt-3 border-t border-light-beige/60 flex items-center justify-between">
          <div className="h-5 bg-soft-beige rounded w-20" />
          <div className="h-4 bg-soft-beige rounded w-14" />
        </div>
      </div>
    </div>
  );
}
