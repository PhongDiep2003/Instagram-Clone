import { firestore } from '../firebase/firebase'
import { arrayUnion, updateDoc, doc} from 'firebase/firestore'
import userAuthStore from '../storage/useStorage'
import userChatStore from '../storage/userChatStore'
const useSendMessage = () => {
  const userAuth = userAuthStore(state => state.user)
  const {addMessage} = userChatStore()
  const sendMessage = async (chatId, content) => {
    try {
      const docRef = doc(firestore, 'chats', chatId)
      const messageObj = {
        from: userAuth.uid,
        content: content
      }
      await updateDoc(docRef, {
        messages: arrayUnion(messageObj)
      })
      addMessage(chatId, messageObj)
    } catch(error) {
      console.log(error.message)
    }
  }
  return {sendMessage}
}

export default useSendMessage
