import { create } from 'zustand';

const userSearchState = create((set) => ({
  searching: false,
  setSearching: (searching) => set({searching}),
}))

export default userSearchState;