import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useToasts from './useToast';
import userAuthStore from '../storage/useStorage';
const useSignout = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const {showToast} = useToasts()
  const deleteAuthInfo = userAuthStore(state => state.logout)
  const logout = async () => {
    try {
      await signOut()
      deleteAuthInfo()
      localStorage.removeItem('user')
      showToast('Success', 'You have logged out successfully', 'success')
    } catch(error) {
      showToast('Error', error.message, 'error')
    }
  }
  return {logout}
}

export default useSignout
