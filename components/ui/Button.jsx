import React from 'react';
import { cn } from '@/libs/utils';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl cursor-pointer";

  const variants = {
    primary: "bg-[#343E2D] text-white hover:bg-[#293223] focus:ring-[#343E2D] shadow-xs",
    terracotta: "bg-[#C16238] text-white hover:bg-[#A9522B] focus:ring-[#C16238] shadow-xs",
    secondary: "bg-[#F4EFEA] text-charcoal hover:bg-[#EAE4DC] focus:ring-warm-gray",
    outline: "border border-light-beige text-charcoal hover:bg-soft-beige hover:border-charcoal/30 focus:ring-deep-olive",
    white: "bg-white text-charcoal hover:bg-warm-ivory border border-transparent shadow-xs focus:ring-charcoal",
    ghost: "text-charcoal hover:bg-soft-beige/60 focus:ring-warm-gray"
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-sm sm:text-base px-7 py-3.5 gap-2.5"
  };

  const combinedClasses = cn(baseStyles, variants[variant] || variants.primary, sizes[size] || sizes.md, className);

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
