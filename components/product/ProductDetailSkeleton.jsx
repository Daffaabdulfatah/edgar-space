import React from 'react';

export default function ProductDetailSkeleton() {
  return (
    <div className="py-8 sm:py-12 max-w-[1280px] mx-auto px-6 lg:px-8 space-y-12 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-soft-beige rounded w-48" />

      {/* Main Product Section: Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white p-6 sm:p-10 rounded-2xl border border-light-beige">
        {/* Gallery Skeleton */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square w-full bg-soft-beige/70 rounded-2xl border border-light-beige" />
          <div className="flex space-x-3">
            <div className="w-16 h-16 bg-soft-beige/70 rounded-xl" />
            <div className="w-16 h-16 bg-soft-beige/70 rounded-xl" />
            <div className="w-16 h-16 bg-soft-beige/70 rounded-xl" />
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="h-4 bg-soft-beige/70 rounded w-28" />
            <div className="h-8 bg-soft-beige/70 rounded w-3/4" />
          </div>

          <div className="h-8 bg-soft-beige/70 rounded w-40" />

          <div className="space-y-2 pt-4 border-t border-light-beige">
            <div className="h-4 bg-soft-beige/70 rounded w-full" />
            <div className="h-4 bg-soft-beige/70 rounded w-5/6" />
            <div className="h-4 bg-soft-beige/70 rounded w-2/3" />
          </div>

          <div className="h-12 bg-soft-beige/70 rounded-btn w-full" />
        </div>
      </div>
    </div>
  );
}
