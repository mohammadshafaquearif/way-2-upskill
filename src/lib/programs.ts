import { COURSES } from '@/lib/courses';

export interface Program {
  id: string;
  title: string;
  route: string;
  image: string;
  logo: string;
  duration: string;
  partner: string;
  code: string;
}

export const PROGRAMS: Program[] = COURSES.map((course) => ({
  id: course.id,
  title: course.title,
  route: course.route,
  image: course.image,
  logo: course.logo,
  duration: course.duration,
  partner: 'Zyvotrix',
  code: course.code,
}));
