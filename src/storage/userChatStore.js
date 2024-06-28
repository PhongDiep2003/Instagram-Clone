import { create } from "zustand";
const userChatStore = create((set) => ({
  userChat: [],
  setUserChat: (userChat) => set({userChat}),
  addChat: (newChat) => set((state) => ({
    userChat: [
      newChat,
      ...state.userChat
    ]
  })),
  addMessage: (chatId, message) => set((state) => ({
    userChat: state.userChat.map((chat) => {
      if (chat.chatId === chatId) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            message,
          ]
        };
      }
      return chat;
    })
  })),
}))

export default userChatStore