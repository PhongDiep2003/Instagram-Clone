import {doc, setDoc, getDoc} from 'firebase/firestore'
import { auth, firestore } from '../firebase/firebase';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import useToasts from './useToast';
import userAuthStore from '../storage/useStorage';
const useGoogleSignin = () => {
  const storeSignupInfo = userAuthStore(state => state.login)
  const {showToast} = useToasts()
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const useGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle()
      console.log(newUser)
      if (!newUser) {
        showToast('Error', 'Sign in with Google failed', 'error')
        return
      }
      const docRef = doc(firestore, 'users', newUser.user.uid)
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        const userDoc = docSnapshot.data()
        localStorage.setItem('user', JSON.stringify(userDoc))
        storeSignupInfo(userDoc)
      }
      else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split('@')[0],
          bio: '',
          profilePicture: newUser.user.photoURL,
          followers: [],
          followings: [],
          posts: [],
          createdDate: Date.now()
        }
        await setDoc(doc(firestore,'users',newUser.user.uid), userDoc)
        localStorage.setItem('user', JSON.stringify(userDoc))
        storeSignupInfo(userDoc)
        showToast('Success', 'User is created successfully with Google Gmail', 'success')
      }
    } catch(error) {
      console.log(error)
    }
  }
  
  return {useGoogleAuth, loading, error}
}

export default useGoogleSignin
