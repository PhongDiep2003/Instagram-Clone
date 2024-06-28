import { firestore } from '../firebase/firebase'
import userAuthStore from '../storage/useStorage'
import { arrayUnion, arrayRemove, updateDoc, doc } from 'firebase/firestore'
import usePostStorage from '../storage/usePostStorage'
const useHandleLike = () => {
  const userAuth = userAuthStore(state => state.user)
  const {addLikes} = usePostStorage()
  const handleLike =  async (post) => {
    try {
      const postRef = doc(firestore, 'posts', post.postId)
      if (post.likes.includes(userAuth.uid)) {
        await updateDoc(postRef, {
          likes: arrayRemove(userAuth.uid)
        })
        addLikes(post.postId, userAuth.uid, false)
        return
      }
      // follow 
      await updateDoc(postRef, {
        likes: arrayUnion(userAuth.uid)
      })
      addLikes(post.postId, userAuth.uid, true)
    } catch(error) {
      console.log(error.message)
    }
  }
  return {handleLike}
}

export default useHandleLike
