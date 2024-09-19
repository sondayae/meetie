import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type studyStore = {
  joinedStudyList: any;
  setJoinedStudyList: (studyList: any) => void;
};

export const useJoinedStudyStore = create(persist<studyStore>(
  (set) => ({
    joinedStudyList: [],
    setJoinedStudyList: (joinedStudyList) => set(() => ({ joinedStudyList: joinedStudyList })),
  }),
  {
    name: 'joinedStudyStorage',
  }
));