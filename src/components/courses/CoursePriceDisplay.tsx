import React from 'react';
import { useCoursePrice } from '@/hooks/useCoursePrice';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface CoursePriceDisplayProps {
  courseCode: string;
  className?: string;
}

const CoursePriceDisplay = ({ courseCode, className }: CoursePriceDisplayProps) => {
  const { displayPrice, chargeLabel, price, isLoading } = useCoursePrice({ courseCode });

  if (isLoading) {
    return <Skeleton className={cn('h-8 w-28', className)} />;
  }

  return (
    <div className={className}>
      <p className="text-2xl font-bold text-primary">{displayPrice}</p>
      {price.inrBase != null && (
        <p className="mt-1 text-sm text-muted-foreground">
          Base + 18% GST = {chargeLabel}
        </p>
      )}
    </div>
  );
};

export default CoursePriceDisplay;
