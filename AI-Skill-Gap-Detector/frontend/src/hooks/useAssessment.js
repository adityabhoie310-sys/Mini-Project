import { useState, useCallback } from 'react';
import { submitAssessment } from '../services/assessmentService';

export const useAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submit = useCallback(async (data) => {
    setLoading(true);
    try {
      const res = await submitAssessment(data);
      setResult(res.data);
      return res.data;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, result, submit };
};
export default useAssessment;
