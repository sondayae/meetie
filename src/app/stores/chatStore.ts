import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ChatUserStore = {
  selectedUserId: string|null;
  setSelectedUserId: (selectedUserId: string) => void;
};


export const useChatUserStore = create(persist<ChatUserStore>(
  (set) => ({
  selectedUserId: null,
  setSelectedUserId: (selectedUserId) => set(() => ({ selectedUserId: selectedUserId })),
  }),
  {
    name: 'chatUserStorage',
  }
));


type MessageStore = {
  message: string;
  setMessage: (message: string) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  message: '',
  setMessage: (message) => set(() => ({ message: message })),
}));