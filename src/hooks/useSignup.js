import {doc, setDoc, collection, query, where, getDocs} from 'firebase/firestore'
import { auth, firestore } from '../firebase/firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import useToasts from './useToast';
import userAuthStore from '../storage/useStorage';

const useSignup = () => {
  const storeSignupInfo = userAuthStore(state => state.login)
  const {showToast} = useToasts()
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
    const signup =  async (inputs) => {
    if (!inputs.email || !inputs.password || !inputs.confirmPassword || !inputs.username) {
      // toast
      showToast('Error', 'Please fill all the fields', 'error')
      return
    }
    else if (inputs.password !== inputs.confirmPassword) {
      // toast
      showToast('Error', "Confirm password doesn't match with password", 'error')
      return
    }
    else if (inputs.username.split(' ').length > 1) {
      showToast('Error', "Username can't have space. Use '_' to separate words", 'error')
      return
    }
    else {
      try {
        // check existing username
        const q = query(collection(firestore, 'users'), where('username', '==', inputs.username))
        const querySnapshot = await getDocs(q)
        if (!querySnapshot.empty) {
          showToast('Error', 'Username has been taken', 'error')
          return
        }
        //create new account
        const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
        if (!newUser && error) {
          console.log(error)
          return
        }
        if (newUser) {
          const userDoc = {
            uid: newUser.user.uid,
            email: inputs.email,
            username: inputs.username,
            bio: '',
            profilePicture: '',
            followers: [],
            followings: [],
            posts: [],
            createdDate: Date.now()
          }
          await setDoc(doc(firestore, 'users' , newUser.user.uid), userDoc)
          localStorage.setItem('user', JSON.stringify(userDoc));
          storeSignupInfo(userDoc)
          showToast('Success', 'User is created successfully', 'success')
        } 
      } catch (error) {
        console.log(error)
      }
    }
  }
  return {loading, error, signup}
}

export default useSignup
