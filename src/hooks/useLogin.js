import { useSignInWithEmailAndPassword  } from 'react-firebase-hooks/auth';
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from '../firebase/firebase';
import useToasts from './useToast';
import userAuthStore from '../storage/useStorage';
const useLogin = () => {
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const {showToast} = useToasts()
  const storeSignupInfo = userAuthStore(state => state.login)
  const login = async (inputs) => {
    if (!inputs.email || !inputs.password) {
      showToast('Error', 'Please fill all the fields', 'error')
      return
    }
    try {
      const user =  await signInWithEmailAndPassword(inputs.email, inputs.password)
      if (user) {
        const docRef = doc(firestore, 'users', user.user.uid)
        const docSnapshot = await getDoc(docRef)
        if (docSnapshot.exists()) {
          const userDoc = docSnapshot.data()
          localStorage.setItem('user', JSON.stringify(userDoc))
          storeSignupInfo(docSnapshot.data())
          showToast('Success', 'User is logged in successfully', 'success')
        }
        else {
          showToast('Error', "User is not found in firestore", 'error')
        }
      }
    }
    catch(error) {
      console.log(error)
    }
  }
  return {error, loading, login}
}

export default useLogin
