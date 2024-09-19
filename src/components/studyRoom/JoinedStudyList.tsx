'use client';

import { useJoinedStudyStore } from '@/stores/studyStore'
import { useEffect } from 'react';

export default function JoinedStudyList({list}: {list: any}) {
  const { setJoinedStudyList } = useJoinedStudyStore();

  useEffect(() => {
    setJoinedStudyList(list);
  }, []);

  return <></>;
}