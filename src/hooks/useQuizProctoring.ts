import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseQuizProctoringResult {
  violationCount: number;
  setViolationCount: Dispatch<SetStateAction<number>>;
  showReturnOverlay: boolean;
  dismissReturnOverlay: () => void;
}

export function useQuizProctoring(active: boolean): UseQuizProctoringResult {
  const { toast } = useToast();
  const [violationCount, setViolationCount] = useState(0);
  const [showReturnOverlay, setShowReturnOverlay] = useState(false);

  const recordViolation = useCallback(
    (message: string) => {
      setViolationCount((count) => count + 1);
      toast({
        title: 'Quiz integrity warning',
        description: message,
        variant: 'destructive',
      });
    },
    [toast],
  );

  useEffect(() => {
    if (!active) {
      setShowReturnOverlay(false);
      return;
    }

    const onVisibilityChange = () => {
      if (document.hidden) {
        setViolationCount((count) => count + 1);
        return;
      }
      setShowReturnOverlay(true);
      recordViolation('You left the quiz tab. Stay on this page until you submit.');
    };

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const blockClipboard = (event: ClipboardEvent) => {
      event.preventDefault();
      recordViolation('Copying quiz content is not allowed.');
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const isScreenshotShortcut =
        event.key === 'PrintScreen' ||
        (event.metaKey && event.shiftKey && ['3', '4', '5'].includes(event.key)) ||
        (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 's');

      if (isScreenshotShortcut) {
        event.preventDefault();
        recordViolation('Screenshots and screen recording are not permitted during the quiz.');
        void navigator.clipboard?.writeText('').catch(() => undefined);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('beforeunload', onBeforeUnload);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('copy', blockClipboard);
    document.addEventListener('cut', blockClipboard);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('beforeunload', onBeforeUnload);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('copy', blockClipboard);
      document.removeEventListener('cut', blockClipboard);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active, recordViolation]);

  const dismissReturnOverlay = useCallback(() => {
    setShowReturnOverlay(false);
  }, []);

  return { violationCount, setViolationCount, showReturnOverlay, dismissReturnOverlay };
}
