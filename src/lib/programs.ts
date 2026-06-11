import { COURSES } from '@/lib/courses';

export interface Program {
  id: string;
  title: string;
  route: string;
  image: string;
  duration: string;
  cohortStarts: string;
  partner: string;
  code: string;
}

export const PROGRAMS: Program[] = COURSES.map((course) => ({
  id: course.id,
  title: course.title,
  route: course.route,
  image: course.image,
  duration: course.duration,
  cohortStarts: course.cohortStarts,
  partner: 'Zyvotrix',
  code: course.code,
}));
