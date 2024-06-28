import { create } from "zustand";
const userPostState = create((set) => ({
  posting: false,
  setPosting: (posting) => set({posting})
}))
export default userPostState