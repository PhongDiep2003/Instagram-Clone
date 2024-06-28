import {useState} from 'react'
// Comment object: {'createdBy', 'commentContent', 'Date created', 'postId'}
import userAuthStore from '../storage/useStorage'
import { firestore } from '../firebase/firebase'
import { doc, arrayUnion, updateDoc } from 'firebase/firestore'
import usePostStorage from '../storage/usePostStorage'
const useCreateCommand = () => {
  const [isPostingComment, setIsPostingComment] = useState(false)
  const userAuth = userAuthStore(state => state.user)
  const {addComments} = usePostStorage()
  const postComment = async (postId, comment) => {
    // return if already in posting process
    if (isPostingComment) return
    try {
      setIsPostingComment(true)
      const postRef = doc(firestore, 'posts', postId)
      const commentDoc = {
        comment,
        createdBy: userAuth.uid,
        date: Date.now(),
        postId,
      }
      await updateDoc(postRef, {
        comments: arrayUnion(commentDoc)
      })
      addComments(postId, commentDoc)
    } catch(error) {
      console.log(error)
    } finally {
      setIsPostingComment(false)
    } 
  }
  return {isPostingComment, postComment}
  
}

export default useCreateCommand