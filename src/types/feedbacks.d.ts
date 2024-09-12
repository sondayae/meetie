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
  title: string;
};

type User = {
  id: string;
  name: string;
  images: Image | null;
};

type Feedback = {
  id: number;
  text: string;
  created_at: string;
  homework: Homework;
  user: User;
  images: Image[];
  comment: FeedComment[] | null;
  feedback_reactions: any[]; // feedback_reactions는 비어있으므로 타입을 any[]로 설정
};
