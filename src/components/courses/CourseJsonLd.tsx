import { useMemo } from 'react';
import { useMentorshipEntry } from '@/hooks/useMentorshipEntry';
import { withoutPriceOffers } from '@/lib/mentorshipEntry';

interface CourseJsonLdProps {
  schema: object;
}

const CourseJsonLd = ({ schema }: CourseJsonLdProps) => {
  const fromMentorship = useMentorshipEntry();
  const data = useMemo(
    () => (fromMentorship ? withoutPriceOffers(schema) : schema),
    [fromMentorship, schema],
  );

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
};

export default CourseJsonLd;
