export type Feedback = {
  id: string;
  text: string;
  created_at: string;
  homework: {
    id: string;
    title: string;
  };
  user: {
    id: string;
    name: string;
    images?: {
      url: string;
    }
  };
  images: {
    url: string;
  }[];
  comments: [];
  feedback_reactions: [];
};
