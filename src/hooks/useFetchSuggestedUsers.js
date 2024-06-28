import {useEffect, useState} from 'react'
import userAuthStore from '../storage/useStorage'
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
const useFetchSuggestedUsers = () => {
  const [isGettingSuggestedUsers, setIsGettingSuggestedUsers] = useState(false)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const userAuth = userAuthStore(state => state.user)
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        setIsGettingSuggestedUsers(true)
        const collectionRef = collection(firestore, 'users')
        const q = query(collectionRef, where('uid', 'not-in', [userAuth.uid, ...userAuth.followings]), limit(5))
        const dataSnapShot = await getDocs(q)
        if (dataSnapShot.empty) {
          setSuggestedUsers([])
          return
        }
        const suggestedUsers = []
        dataSnapShot.forEach(doc => suggestedUsers.push(doc.data()))
        setSuggestedUsers(suggestedUsers)
      } catch(error) {
        console.log(error.message)
      } finally {
        setIsGettingSuggestedUsers(false)
      }
    }
    fetchSuggestedUsers()
  }, [userAuth])

  return {isGettingSuggestedUsers, suggestedUsers}
}

export default useFetchSuggestedUsers
