type Image = {
  url: string;
};

type FeedComment = {
  id: number;
  comment: string;
  user_id: string;
  target_id: number;
  created_at: string;
  user?: User;
  reactions: Reaction[];
};

interface Reaction {
  id: number;
  user_id: string;
  target_id: number;
  emoji: string;
  created_at: string;
};

type Homework = {
  id: number;
  study_id: number;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  created_at: string;
};

type User = {
  id: string;
  name: string;
  images: Image | null;
};

type FeedReaction = {
  id: number;
  target_id: number;
  user_id: string;
  emoji: string;
  created_at: string;
  user?: User;
}

type Feedback = {
  id: number;
  text: string;
  created_at: string;
  homework: Homework;
  user: User;
  images: Image[];
  comments: FeedComment[] | null;
  feedback_reactions: FeedReaction[]; // feedback_reactions는 비어있으므로 타입을 any[]로 설정
};
