import {useState, useEffect} from 'react'
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import userAuthStore from '../storage/useStorage';
import useToasts from './useToast';
import userProfileStore from '../storage/userProfileStore';
const useFollowUsers = (userId) => {
  // a state variable that is used to check whether we have followed the user or not 
  const [isFollowing, setIsFollowing] = useState(false)
  const [isUpdatingFollowing, setIsUpdating] = useState(false)
  const {showToast} = useToasts()
  const userAuth = userAuthStore(state => state.user)
  const updateUserAuth = userAuthStore(state => state.update)
  const updateProfile = userProfileStore(state => state.setUserProfile)
  const profile = userProfileStore(state => state.userProfile)
  useEffect(() => {
    const checkIsFollowing = async () => {
      try {
        console.log(userAuth)
        console.log(userId)
        console.log(userAuth.followings.includes(userId))
        setIsFollowing(userAuth.followings.includes(userId))
      } catch(error) {
        showToast('Error', error.message, 'error')
      }
    }
    checkIsFollowing()
  },[userId])

  const followUser =  async () => {
    try {
      setIsUpdating(true)
      const docRef = doc(firestore, 'users', userAuth.uid)
      const followingUserDocRef = doc(firestore, 'users', userId)
      // if we have already followed the user that associated with the passed user id, unfollow 
      if (isFollowing) {
        await updateDoc(docRef, 
          {
            followings: arrayRemove(userId)
          })
        
        await updateDoc(followingUserDocRef, 
          {
            followers: arrayRemove(userAuth.uid)
          })

        //update useAuth state
        updateUserAuth({
          ...userAuth,
          followings: userAuth.followings.filter(uid => uid != userId)
        })

        // if on profile page, we also need to update profile state so that the changes can reflect instantly
        if (profile) {
          // if on our own profile (might be unnecessary)
          if (profile.username == userAuth.username) {
            updateProfile({
              ...profile,
              followings: profile.followings.filter(uid => uid != userId)
            })
          } 
          // if on someone else profile
          else {
            updateProfile({
              ...profile,
              followers: profile.followings.filter(uid => uid != userAuth.uid)
            })
          }
        }

        //update local storage
        localStorage.setItem('user', JSON.stringify({
          ...userAuth,
          followings: userAuth.followings.filter(uid => uid != userId)
        }))
        setIsFollowing(false)
        showToast('Success', 'Unfollowed user successfully', 'success')
      }
      // else follow 
      else {
        await updateDoc(docRef,
          {
            followings: arrayUnion(userId)
          } 
          )
        await updateDoc(followingUserDocRef, 
          {
            followers: arrayUnion(userAuth.uid)
          })

        //update useAuth state
        updateUserAuth({
          ...userAuth,
          followings: [...userAuth.followings, userId]
        })

        // if on profile page, we also need to update profile state so that the changes can reflect instantly
        if (profile) {
          // if on our own profile (might be unnecessary)
          if (profile.username == userAuth.username) {
            updateProfile({
              ...profile,
              followings: [...userAuth.followings, userId]
            })
          } 
          // if on someone else profile
          else {
            updateProfile({
              ...profile,
              followers: [...profile.followers, userAuth.uid]
            })
          }
        }

        //update local storage
        localStorage.setItem('user', JSON.stringify({
          ...userAuth,
          followings: [...userAuth.followings, userId]
        }))
        setIsFollowing(true)
        showToast('Success', 'Followed user successfully', 'success')
        
      }
    } catch(error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsUpdating(false)
    }
  }
  return {isFollowing, isUpdatingFollowing, followUser}
}

export default useFollowUsers
