// hooks/useSessionTimer.ts
import { useEffect, useRef } from 'react';
import { useUserStore } from '@/store/useUserStore';
import axios from 'axios';

export const useSessionTimer = () => {
  const { isAuthenticated, user } = useUserStore();
  const totalTimeRef = useRef(0);
  const lastStartRef = useRef<number | null>(null);

  const startTracking = () => {
    if (document.visibilityState === 'visible') {
      lastStartRef.current = Date.now();
    }
  };

  const pauseTracking = () => {
    if (lastStartRef.current) {
      const now = Date.now();
      totalTimeRef.current += now - lastStartRef.current;
      lastStartRef.current = null;
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      pauseTracking();
    } else if (document.visibilityState === 'visible') {
      startTracking();
    }
  };

  const handleBeforeUnload = async () => {
    pauseTracking();
    if (user && totalTimeRef.current > 0) {
      try {
        await axios.post('http://localhost:3001/api/analytics/session', {
          userId: user._id,
          durationMs: totalTimeRef.current,
        });
      } catch (err) {
        console.error('Failed to send time tracking data', err);
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !user?.isVerified) return;

    startTracking();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      pauseTracking();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isAuthenticated, user]);
};
