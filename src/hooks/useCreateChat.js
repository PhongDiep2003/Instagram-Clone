import React, {useState} from 'react'
import { firestore } from '../firebase/firebase'
import { collection, doc, setDoc, query , where, getDoc, getDocs} from 'firebase/firestore'
import userAuthStore from '../storage/useStorage'
import userChatStore from '../storage/userChatStore'
import useToasts from './useToast'
const useCreateChat = () => {
  const {showToast} = useToasts()
  const addNewChat = userChatStore(state => state.addChat)
  const userAuth = userAuthStore(state => state.user)
  const createChat = async (userId) => {
    try {
      // check if we have initated a chat with this user before or not
      const q1 = query(collection(firestore, 'chats'), where('user1', '==', userAuth.uid), where('user2', '==', userId))
      const q2 = query(collection(firestore, 'chats'), where('user1', '==', userId), where('user2', '==', userAuth.uid))
      
      const doc1 = await getDocs(q1)
      const doc2 = await getDocs(q2)
      if (!doc1.empty || !doc2.empty) {
        showToast('Error', 'You have already started a chat with this user', 'error')
        return
      }
      const chatRef = doc(collection(firestore, 'chats'));
      const chatId = chatRef.id
      const chatDoc = {
        user1: userAuth.uid,
        user2: userId,
        chatId,
        messages: []
      }
      await setDoc(chatRef, chatDoc)
      addNewChat(chatDoc)
      showToast('Success', 'You have started a chat with this user successfully', 'success')
    } catch(error) {
      console.log(error.message)
    }
  }
  return {createChat}
}

export default useCreateChat
