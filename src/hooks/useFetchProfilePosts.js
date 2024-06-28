import React, {useEffect, useState} from 'react'
import userAuthStore from '../storage/useStorage'
import { firestore } from '../firebase/firebase'
import { collection, query, getDocs, where } from 'firebase/firestore'
import userProfileTabState from '../storage/userProfileTabState'
import usePostStorage from '../storage/usePostStorage'
const useFetchProfilePosts = (userId) => {
  const populatePostStorage = usePostStorage(state => state.setPost)
  const userAuth = userAuthStore(state => state.user)
  const [isFetchingMyPosts, setIsFetchingMyPosts] = useState(false)
  const currentProfileTab = userProfileTabState(state => state.currentProfileTab)
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setIsFetchingMyPosts(true)
        const myPostRef = collection(firestore, 'posts')
        let q = ''
        if (currentProfileTab == 'posts') {
          q = query(myPostRef, where('createdBy', '==', userId))
        }
        else {
          q = query(myPostRef, where('likes', 'array-contains', userId))
        }
        const dataSnapshots = await getDocs(q)
        if (dataSnapshots.empty) {
          populatePostStorage([])
          return
        }
        const posts = []
        dataSnapshots.forEach(post => posts.push(post.data()))
        populatePostStorage(posts)
      } catch(error) {
        console.log(error.message)
      } finally {
        setIsFetchingMyPosts(false)
      }
    }
    fetchMyPosts()

  },[userId, userAuth, currentProfileTab])
  return {isFetchingMyPosts}
}

export default useFetchProfilePosts