export interface Feedback {
  id: string;
  text: string;
  created_at: string;
  homework?: Homework | Homework[]
  user: User | User[]
  images: {
    url: string;
  }[];
  comments?: [];
  feedback_reactions?: [];
};

type Homework = {
  id: string;
  title: string;
  subtitle: string;
};

type User = {
  id: string;
  name: string;
  images?: {
    url: string;
  }[]
};
