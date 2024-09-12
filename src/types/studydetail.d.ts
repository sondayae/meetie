export interface StudyDetail {
  memberData: any,
  userdata: any;

  isApply: boolean;

  params: { studyId: string };

  title: string;
  endDate: string;
  startDate: string;
  created_at: string;
  viewCount: number;
  goal: string;
  info: string;
  recruitNum: number;
  tags: string[];
  isRecruiting: string;
  recruitNum: number;

  user: {
    id: string;
    name: string;
    images?: {
      url: string;
    };
  };
}
