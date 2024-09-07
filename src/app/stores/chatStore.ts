import { create } from 'zustand';


type ChatStore = {
  selectedUserId: string|null;
  setSelectedUserId: (selectedUserId: string) => void;
};


export const useChatStore = create<ChatStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (selectedUserId) => set(() => ({ selectedUserId: selectedUserId })),
}));