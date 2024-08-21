import { create } from 'zustand';

const useChatStore = create((set) => ({
  selectedChat: null,
  setSelectedChat: (chat) => set({ selectedChat: chat }),
  messages: [],
  setMessages: (messages) => set({ messages: messages }),
}));

export default useChatStore;