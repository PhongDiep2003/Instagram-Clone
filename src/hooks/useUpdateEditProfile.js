import {useState} from 'react'
import userAuthStore from '../storage/useStorage'
import useToasts from './useToast'
import {ref, getDownloadURL, uploadString} from 'firebase/storage'
import {firestore, storage} from '../firebase/firebase'
import { doc, updateDoc } from "firebase/firestore";
import userProfileStore from '../storage/userProfileStore'
const useUpdateEditProfile = () => {
  const {showToast} = useToasts()
  const [isUpdating, setIsUpdating] = useState(false)
  const userAuth = userAuthStore(state => state.user)
  const updateUserAuth = userAuthStore(state => state.update)
  const updateProfileInfo = userProfileStore(state => state.setUserProfile)
  const updateEditProfile = async (inputs, newImage) => {
    if (!isUpdating) {
      try {
        setIsUpdating(true)
        const storageRef = ref(storage, `profilePics/${userAuth.uid}`)
        const userRef = doc(firestore, 'users', userAuth.uid)
        let url = ''

        if (newImage) {
          await uploadString(storageRef, newImage, 'data_url')
          url = await getDownloadURL(storageRef)
        }
        const updatedFields = {
          ...userAuth,
          username: inputs.username || userAuth.username,
          bio: inputs.bio || userAuth.bio,
          profilePicture: url || userAuth.profilePicture
        }
        await updateDoc(userRef, updatedFields);
        updateUserAuth(updatedFields)
        updateProfileInfo(updatedFields)
        localStorage.setItem('user', JSON.stringify(updatedFields))
      } catch(error) {
        showToast('Error', error.message, 'error')
      } finally {
        setIsUpdating(false)
      }
    }
  }
  return {isUpdating, updateEditProfile}
}

export default useUpdateEditProfile
