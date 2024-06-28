import {useEffect, useState} from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
const useGetPostOwner = (userId) => {
  const [postOwner, setPostOwner] = useState(null)
  useEffect(() => {
    const getPostOwner = async () => {
      try {
        const docRef = doc(firestore, 'users', userId)
        const docSnapShot = await getDoc(docRef)
        if (!docSnapShot.exists()) {
          console.log('cannot find post owner')
          return
        }
        setPostOwner(docSnapShot.data())

      } catch(error) {
        console.log(error.message)
      }
    }
    getPostOwner()
  }, [userId])
  return {postOwner}
}

export default useGetPostOwner