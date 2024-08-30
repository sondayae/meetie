import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import { useParams } from 'next/navigation';

export function getacceptedApplyUser() {
  const [acceptedNum, setAcceptedNum] = useState(0);
  const params = useParams();

  useEffect(() => {
    async function getApply() {
      const { data, error } = await supabase
        .from('study_apply')
        .select('*')
        .eq('studyId', params.studyId)
        .eq('status', 'accepted');

      setAcceptedNum(data);
    }

    getApply();
  }, []);

  return acceptedNum;
}
