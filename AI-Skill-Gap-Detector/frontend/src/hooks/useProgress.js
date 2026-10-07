import { useState, useEffect } from 'react';
import { getProgress } from '../services/progressService';

export const useProgress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProgress()
      .then(res => setProgress(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { progress, loading };
};
export default useProgress;
