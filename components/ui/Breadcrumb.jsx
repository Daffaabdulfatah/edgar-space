import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

/**
 * Reusable accessible Breadcrumb component
 * @param {{ items: Array<{ label: string, href?: string }> }} props 
 */
export default function Breadcrumb({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-2.5">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-warm-gray font-sans">
        {/* Home Root */}
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-warm-gray hover:text-deep-olive transition-colors"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span>Beranda</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center space-x-1.5">
              <ChevronRight className="w-3 h-3 text-light-taupe shrink-0" />
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-deep-olive transition-colors truncate max-w-[200px]"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-charcoal font-medium truncate max-w-[240px] sm:max-w-md" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
