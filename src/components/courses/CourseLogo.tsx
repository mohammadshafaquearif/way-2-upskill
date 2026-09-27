import { COURSE_BY_ID } from '@/lib/courses';
import { cn } from '@/lib/utils';

const sizes = {
  xs: 'h-5 w-5',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
} as const;

const CourseLogo = ({
  courseId,
  size = 'sm',
  className,
}: {
  courseId: string;
  size?: keyof typeof sizes;
  className?: string;
}) => {
  const course = COURSE_BY_ID[courseId];
  if (!course?.logo) return null;

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md bg-white p-0.5 ring-1 ring-black/10',
        sizes[size],
        className,
      )}
    >
      <img src={course.logo} alt="" className="h-full w-full object-contain" />
    </span>
  );
};

export default CourseLogo;
