import React from 'react';
import { Button } from '@/components/ui/button';
import { useEnrollModal } from '@/contexts/EnrollModalContext';

type EnrollButtonProps = React.ComponentProps<typeof Button> & {
  programName?: string;
};

const EnrollButton = ({ programName, onClick, children, ...props }: EnrollButtonProps) => {
  const { openEnrollModal } = useEnrollModal();

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
