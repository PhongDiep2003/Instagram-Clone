import React, {useEffect, useState} from 'react'
import {Box, Flex, Container, Circle, Avatar, Text,Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody, useDisclosure, Button,ModalHeader, Input, InputGroup, InputRightElement} from '@chakra-ui/react'
import userAuthStore from '../storage/useStorage'
import { firestore } from '../firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'
import MessageBox from './MessageBox'
import useSendMessage from '../hooks/useSendMessage'
const ChatFrame = ({chatInfo}) => {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [user, setUser] = useState(null)
  const userAuth = userAuthStore(state => state.user)
  const {sendMessage} = useSendMessage()
  const [input, setInput] = useState('')
  useEffect(() => {
    const getUserById = async () => {
      try {
        const userId = chatInfo.user1 === userAuth.uid ? chatInfo.user2 : chatInfo.user1
        console.log(userId)
        console.log(chatInfo)
        const docRef = doc(firestore, 'users', userId);
        const docSnapShot = await getDoc(docRef)
        console.log(docSnapShot)
        if (docSnapShot.exists()) {
          setUser(docSnapShot.data())
          console.log('passed')
        }
      } catch(error) {
        console.log(error.message)
      }
    }
    getUserById()

  }, [chatInfo])
  return (
    <>
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'} border={'0.5px solid grey'} p={3} _hover={{transform: 'scale(1.0009)'}} transition={'0.2s ease-in-out'} cursor={'pointer'} onClick={onOpen}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar alt='suggested users profile picture' size={'md'} src={user && user.profilePicture}></Avatar>
        <Flex justifyContent={'space-between'} direction={'column'} gap={1}>
          <Text fontSize={16} fontWeight={'bold'}>{user && user.username}</Text>
          <Text fontSize={14} color={'gray.500'}>{chatInfo.messages.length > 0 && chatInfo.messages[chatInfo.messages.length - 1].content}</Text>
        </Flex>
      </Flex>
    </Flex>
    <Modal isOpen={isOpen} size={'xl'}  onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalBody>
            <Flex height={'700px'}  direction={'column'} gap={5} overflowX={'hidden'} overflowY={'scroll'}>
              {
                chatInfo.messages.length > 0 &&
                chatInfo.messages.map((message, i) => <MessageBox message={message.content} user={message.from === userAuth.uid ? userAuth : user} key={i.toString()}/>)
              }
            </Flex>
          </ModalBody>
          <ModalFooter h={'50px'} p={5}>
            <InputGroup>
                <Input placeholder='Search' 
                       size={'lg'} 
                       variant='outline' 
                       type='text' 
                       mr={3} 
                       mb={3}
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       />
                <InputRightElement width='5rem'>
                  <Button h='full' size='sm' mr={3} mt={2}  _hover={{bg: 'blue.400'}} transition={'0.2s ease-in-out'} onClick={() => {
                    sendMessage(chatInfo.chatId, input)
                    setInput('')
                  }}>
                    <Text>Send</Text>
                  </Button>
                </InputRightElement>
              </InputGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
   </>
  )
}

export default ChatFrame
