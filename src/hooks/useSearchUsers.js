import React, { useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import useToasts from './useToast';
const useSearchUsers = () => {
  const [isSearching, setIsSearching] = useState(false)
  const {showToast} = useToasts()
  const [users, setUsers] = useState([])
  const [searched, setSearched] = useState(false)
  const searchUsers = async (username) => {
    try {
      setIsSearching(true)
      if (!username) {
        return
      }
      const q = query(collection(firestore, 'users'), where('username', '==', username))
      const querySnapShot = await getDocs(q)
      if (querySnapShot.empty) {
        setUsers([])
        return
      }
      const result = []
      querySnapShot.forEach(doc => result.push(doc.data()))
      console.log(result)
      setUsers(result)
    } catch(error) {  
      showToast('Error', error.message, 'error')
    } finally {
      setIsSearching(false)
      setSearched(true)
    }
  }
  return {isSearching, users, searchUsers, setUsers, searched, setSearched}
}

export default useSearchUsers
