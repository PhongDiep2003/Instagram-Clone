// take img, caption
//// create a path in firebase/storage to store img posts/postId/picture
// use addDoc to create a doc in the posts collection
// get the id from the created doc and push it into the userAuth's followings list
// update userAuth, update localstorage (just to make sure everything will be in sync)
import {useState} from 'react'
import useToasts from './useToast'
import { doc, setDoc, collection, arrayRemove, arrayUnion, updateDoc} from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { firestore, storage} from '../firebase/firebase';
import userAuthStore from '../storage/useStorage';
import userProfileStore from '../storage/userProfileStore';
import usePostStorage from '../storage/usePostStorage';
const useCreatePost = () => {
  const [isPosting, setIsPosting] = useState(false)
  const {showToast} = useToasts()
  const userAuth = userAuthStore(state => state.user)
  const updateUserAuth = userAuthStore(state => state.update)
  const profile = userProfileStore(state => state.userProfile)
  const setProfile = userProfileStore(state => state.setUserProfile)
  const {postStorage, setPost} = usePostStorage()
  const createPost = async (caption='', image) => {
  // if we're currently in post process, this function should not be invoked
   if (!isPosting) {
    try {
      setIsPosting(true)
      // if user haven't picked image, stop posting process
      if (!image) {
        showToast('Error', 'Please pick an image for your post', 'error')
        return
      }
      // obtain post id beforehand before we actually store the post
      const docRef = doc(collection(firestore, 'posts'));
      const postId = docRef.id
      // create a path to the storage
      const storageRef = ref(storage, `posts/${postId}`)
      // upload the image there
      await uploadString(storageRef, image, 'data_url')
      //get the image and convert it to the url where it can be used to display on web app
      const url = await getDownloadURL(storageRef)
      // create post doc
      const postDoc = {
        likes: [],
        comments: [],
        caption,
        url,
        createdBy: userAuth.uid,
        date: Date.now(),
        postId
      }
      // save it to firestore
      await setDoc(docRef, postDoc)
      // update users firestore with new post
      const userRef = doc(firestore, 'users', userAuth.uid)
      await updateDoc(userRef, {
        posts: arrayUnion(postId)
      })
      // update userAuth
      updateUserAuth({
        ...userAuth,
        posts: [...userAuth.posts, postId]
      })
      // update local storage
      localStorage.setItem('user', JSON.stringify({
        ...userAuth,
        posts: [...userAuth.posts, postId]
      }))
      // update profile if on our own my profile page
      if (profile && profile.username === userAuth.username) {
        setProfile({
          ...profile,
          posts: [...profile.posts, postId]
        })
      }
      setPost([postDoc, ...postStorage])
      showToast('Success', 'Your post is created', 'success')

      } catch(error) {
            showToast('Error', error.message, 'error')

      } finally {
            setIsPosting(false)
      }
   }
  }
  return {isPosting, createPost}
}

export default useCreatePost


