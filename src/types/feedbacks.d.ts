export interface Feedback {
  id: string;
  text: string;
  created_at: string;
  homework?: Homework | Homework[]
  user: {
    id: string;
    name: string;
    images?: {
      url: string;
    }[];
  }[];
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
