import {useEffect, useState} from 'react'
import userAuthStore from '../storage/useStorage'
import userProfileStore from '../storage/userProfileStore'
import {collection, query, where, getDocs, queryEqual} from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
import useToasts from './useToast'
const useFetchProfileInfo = (username) => {
  const userAuth = userAuthStore(state => state.user)
  const [isLoading, setIsLoading] = useState(true)
  const isOnYourProfile = userAuth && userAuth.username === username
  const {userProfile, setUserProfile} = userProfileStore()
  const {showToast} = useToasts()
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        setIsLoading(true)
        if (isOnYourProfile) {
          // if viewing our own profile
          setUserProfile(userAuth)
        }
        else {
          //if viewing other profiles
          const q = query(collection(firestore, 'users'), where('username', '==', username))
          const querySnapshot = await getDocs(q)
          console.log(querySnapshot.empty)
          if (querySnapshot.empty) {
            // if the passed username is not in firestore
            showToast('Error', 'User is not found', 'error')
            setUserProfile(null)
          }
          else {
            querySnapshot.forEach((user) => {
              setUserProfile(user.data())
            })
          }
            
          }
        } catch(error) {
          showToast('Error', error.message, 'error')
        } finally {
          setIsLoading(false)
        }
      }
    fetchProfileInfo()
  },[username])
  return {isLoading, userProfile}
}

export default useFetchProfileInfo
