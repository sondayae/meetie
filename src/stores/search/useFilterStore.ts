import create from 'zustand';
import { Study } from '@/types/study';

type FilterState = {
  isRecruiting: boolean;
  selectedFilter: string;
  activeTag: string;
  originalList: Study[];
  filteredList: Study[];
  setStudyList: (studies: Study[]) => void;
  setIsRecruiting: (value: boolean) => void;
  setSelectedFilter: (filter: string) => void;
  setActiveTag: (tag: string) => void;
};

export const useFilterStore = create<FilterState>((set, get) => ({
  isRecruiting: false,
  selectedFilter: 'desc',
  activeTag: '전체',
  originalList: [],
  filteredList: [],

  // 전체 스터디 목록 필터링 및 정렬
  setStudyList: (studies) =>
    set((state) => {
      const filteredByRecruiting = state.isRecruiting
        ? studies.filter((study) => study.isRecruiting)
        : studies;

      const filteredByTag =
        state.activeTag === '전체'
          ? filteredByRecruiting
          : filteredByRecruiting.filter((study) =>
              study.tags.includes(state.activeTag),
            );

      const sortedStudies =
        state.selectedFilter === 'viewCount'
          ? filteredByTag.sort(
              (a, b) => Number(b.viewCount) - Number(a.viewCount),
            )
          : filteredByTag.sort(
              (a, b) =>
                new Date(String(b.created_at)).getTime() -
                new Date(String(a.created_at)).getTime(),
            );

      return {
        originalList: studies,
        filteredList: sortedStudies,
      };
    }),

  // 모집 중 필터링
  setIsRecruiting: (value) =>
    set((state) => {
      const filteredByRecruiting = value
        ? state.originalList.filter((study) => study.isRecruiting)
        : state.originalList;

      const filteredByTag =
        state.activeTag === '전체'
          ? filteredByRecruiting
          : filteredByRecruiting.filter((study) =>
              study.tags.includes(state.activeTag),
            );

      const sortedStudies =
        state.selectedFilter === 'viewCount'
          ? filteredByTag.sort(
              (a, b) => Number(b.viewCount) - Number(a.viewCount),
            )
          : filteredByTag.sort(
              (a, b) =>
                new Date(String(b.created_at)).getTime() -
                new Date(String(a.created_at)).getTime(),
            );

      return {
        isRecruiting: value,
        filteredList: sortedStudies,
      };
    }),

  // 정렬 변경 (최신순, 조회수순)
  setSelectedFilter: (filter) =>
    set((state) => {
      const sortedStudies =
        filter === 'viewCount'
          ? state.filteredList.sort(
              (a, b) => Number(b.viewCount) - Number(a.viewCount),
            )
          : state.filteredList.sort(
              (a, b) =>
                new Date(String(b.created_at)).getTime() -
                new Date(String(a.created_at)).getTime(),
            );

      return {
        selectedFilter: filter,
        filteredList: sortedStudies,
      };
    }),

  // 태그 필터링
  setActiveTag: (tag) =>
    set((state) => {
      const filteredByTag =
        tag === '전체'
          ? state.originalList
          : state.originalList.filter((study) => study.tags.includes(tag));

      const filteredByRecruiting = state.isRecruiting
        ? filteredByTag.filter((study) => study.isRecruiting)
        : filteredByTag;

      const sortedStudies =
        state.selectedFilter === 'viewCount'
          ? filteredByRecruiting.sort(
              (a, b) => Number(b.viewCount) - Number(a.viewCount),
            )
          : filteredByRecruiting.sort(
              (a, b) =>
                new Date(String(b.created_at)).getTime() -
                new Date(String(a.created_at)).getTime(),
            );

      return {
        activeTag: tag,
        filteredList: sortedStudies,
      };
    }),
}));
