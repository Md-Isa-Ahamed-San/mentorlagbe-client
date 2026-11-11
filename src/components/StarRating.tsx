'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  totalReviews?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  interactive = false,
  onChange,
  size = 'md',
  showNumber = false,
  totalReviews,
  className,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= currentRating;
          const isHalfFilled =
            !isFilled && starValue - 0.5 <= currentRating && currentRating < starValue;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange?.(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={cn(
                'transition-transform',
                interactive
                  ? 'cursor-pointer hover:scale-110 active:scale-95 focus:outline-hidden'
                  : 'cursor-default pointer-events-none'
              )}
              aria-label={`Rate ${starValue} stars`}
            >
              <Star
                className={cn(
                  starSizes[size],
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalfFilled
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'fill-transparent text-slate-300 dark:text-slate-700'
                )}
              />
            </button>
          );
        })}
      </div>

      {showNumber && (
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono">
          {rating > 0 ? rating.toFixed(1) : '0.0'}
        </span>
      )}

      {totalReviews !== undefined && (
        <span className="text-xs text-slate-500 dark:text-slate-400">
          ({totalReviews})
        </span>
      )}
    </div>
  );
}
