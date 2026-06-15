import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authErrorMessage, clearAuthHash, parseAuthHash } from '@/lib/authHash';

/**
 * Handles Supabase auth redirects in the URL hash (recovery links, errors).
 * Must run on every route — recovery errors often land on Site URL (/), not /reset-password.
 */
const AuthHashHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handledRef = useRef<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const parsed = parseAuthHash(hash);
    if (!parsed.accessToken && !parsed.error) return;

    const hashKey = hash.slice(0, 80);
    if (handledRef.current === hashKey) return;
    handledRef.current = hashKey;

    if (parsed.error) {
      const message = authErrorMessage(parsed.errorCode, parsed.errorDescription);
      const isRecoveryError =
        parsed.errorCode === 'otp_expired' ||
        parsed.errorDescription?.toLowerCase().includes('expired') ||
        parsed.errorDescription?.toLowerCase().includes('invalid');

      clearAuthHash();

      if (isRecoveryError && location.pathname !== '/reset-password') {
        navigate('/reset-password', {
          replace: true,
          state: { authError: message, errorCode: parsed.errorCode },
        });
      }
      return;
    }

    if (parsed.accessToken && parsed.type === 'recovery' && location.pathname !== '/reset-password') {
      navigate(`/reset-password${hash}`, { replace: true });
    }
  }, [location.pathname, location.hash, navigate]);

  return null;
};

export default AuthHashHandler;
