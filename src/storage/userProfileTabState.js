import { create } from "zustand";
const userProfileTabState = create((set) => ({
  currentProfileTab: 'posts',
  setCurrentProfileTab: (currentProfileTab) => set({currentProfileTab})
}))
export default userProfileTabState