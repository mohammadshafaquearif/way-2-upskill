import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEnrollModal } from '@/contexts/EnrollModalContext';
import { useMentorshipEntry } from '@/hooks/useMentorshipEntry';

type EnrollButtonProps = React.ComponentProps<typeof Button> & {
  programName?: string;
};

const EnrollButton = ({ programName, onClick, children, ...props }: EnrollButtonProps) => {
  const { openEnrollModal } = useEnrollModal();
  const fromMentorship = useMentorshipEntry();

  if (fromMentorship) {
    const program = programName ? `&program=${encodeURIComponent(programName)}` : '';
    return (
      <Button asChild type="button" {...props}>
        <Link to={`/contact?mentorship=1-on-1${program}#contact-form`}>
          Request your seat
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openEnrollModal(programName);
        }
      }}
    >
      {children}
    </Button>
  );
};

export default EnrollButton;
