import { create } from "zustand";
const usePostStorage = create((set) => ({
    postStorage: [],
    setPost: (postStorage) => set({postStorage}),
    addLikes: (postId, userId, isLike) => set((state) => ({
			postStorage: state.postStorage.map((post) => {
				if (post.postId === postId) {
          if (!isLike) {
            return {
              ...post,
              likes: post.likes.filter(id => id != userId)
            };
          }
          return {
            ...post,
            likes: [...post.likes, userId]
          }
				}
				return post;
			}),
		})),
    addComments: (postId, comment) => set((state) => ({
			postStorage: state.postStorage.map((post) => {
				if (post.postId === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          };
				}
				return post;
			}),
		})),
  }))

export default usePostStorage