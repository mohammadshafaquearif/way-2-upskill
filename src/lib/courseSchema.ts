import type { Course } from '@/lib/courses';
import { ZYVOTRIX_ORGANIZATION } from '@/lib/seo';

const LEAD_INSTRUCTOR = 'Mohammad Shafaque Arif';

const COURSE_SCHEMA_META: Record<
  Course['code'],
  { courseCode: string; priceInr: string; courseWorkload: string }
> = {
  DOP: { courseCode: 'ZYV-DOP-01', priceInr: '24179', courseWorkload: 'PT64H' },
  AAC: { courseCode: 'ZYV-AAC-01', priceInr: '23689', courseWorkload: 'PT48H' },
  AWS: { courseCode: 'ZYV-AWS-01', priceInr: '19569', courseWorkload: 'PT48H' },
  DSP: { courseCode: 'ZYV-DSP-01', priceInr: '22569', courseWorkload: 'PT48H' },
};

export function buildCourseSchema(course: Course) {
  const meta = COURSE_SCHEMA_META[course.code];
  if (!meta) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: ZYVOTRIX_ORGANIZATION,
    courseCode: meta.courseCode,
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'Online',
        courseWorkload: meta.courseWorkload,
        instructor: [
          {
            '@type': 'Person',
            name: LEAD_INSTRUCTOR,
          },
        ],
      },
    ],
    offers: [
      {
        '@type': 'Offer',
        price: meta.priceInr,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        category: 'Paid',
      },
    ],
  };
}
