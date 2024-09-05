export type Handin = {
  id: string;
  studyroom_id: string;
  user: {
    id: string;
    name: string;
    images: {
      url: string;
    }[];
  };
  text: string;
  created_at: string;
  homework: {
    title: string;
  };
  images: {
    url: string;
  }[];
};
