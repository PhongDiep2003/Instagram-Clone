import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
const useFetchCommentsByPostId = (postId) => {
  const [comments, setComments] = useState([])
  const [isFetchingComments, setIsFetchingComments] = useState(false)
  useEffect(() => {
   const fetchComments = async () => {
    try {
      if (isFetchingComments) return
      setIsFetchingComments(true)
      const postRef = doc(firestore, 'posts', postId)
      const postSnapShot =  await getDoc(postRef)
      setComments(postSnapShot.data().comments)
    } catch(error) {
      console.log(error)
    } finally {
      setIsFetchingComments(false)
    } 
   }
   fetchComments()

  }, [])
  return {comments} 
}

export default useFetchCommentsByPostId