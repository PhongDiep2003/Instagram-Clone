import {useState, useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import usePostStorage from '../storage/usePostStorage';
const useFetchPosts = () => {
  const [isFetchingPosts, setIsFetchingPosts] = useState(false)
  const {setPost} = usePostStorage()
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsFetchingPosts(true)
        console.log('is fetching posts')
        const postRef = collection(firestore, 'posts') 
        const postSnapShots = await getDocs(postRef)
        if (postSnapShots.empty) {
          setPost([])
          return
        }
        const allPosts = []
        postSnapShots.forEach(post => allPosts.push(post.data()))
        setPost(allPosts)
      } catch(error) {
        console.log(error.message)
      } finally {
        setIsFetchingPosts(false)
      }
    }
    fetchPosts()
  },[setPost])
  return {isFetchingPosts}
}

export default useFetchPosts