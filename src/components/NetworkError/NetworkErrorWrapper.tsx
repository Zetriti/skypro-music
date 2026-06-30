'use client';

import { ReactNode, useEffect, useState } from 'react';
import NetworkError from './NetworkError';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

interface NetworkErrorWrapperProps {
  children: ReactNode;
}

export default function NetworkErrorWrapper({
  children,
}: NetworkErrorWrapperProps) {
  const { isOnline, hasLostConnection } = useNetworkStatus();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowError(true);
    } else {
      if (showError) {
        setTimeout(() => {
          setShowError(false);
        }, 1000);
      }
    }
  }, [isOnline]);

  const handleRetry = () => {
    if (navigator.onLine) {
      setShowError(false);
      window.location.reload();
    }
  };

  return (
    <>
      {children}
      {showError && <NetworkError onRetry={handleRetry} />}
    </>
  );
}
