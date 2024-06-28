import React, {useEffect, useState} from 'react'
import {Box, Flex, Container, Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody, useDisclosure, Button,ModalHeader, Input, Spinner, Text} from '@chakra-ui/react'
import { FcPlus } from "react-icons/fc";
import ChatFrame from '../components/ChatFrame';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import userAuthStore from '../storage/useStorage';
import SearchedUser from '../components/SearchedUsers/SearchedUser';
import userChatStore from '../storage/userChatStore';
const ChatPage = () => {
  const userAuth = userAuthStore(state => state.user)
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [searchInput, setSearchInput] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [allusers, setAllUsers] = useState([])
  const onCloseModal = () => {
    setSearchInput('')
    onClose()
  }
  const {userChat, setUserChat} = userChatStore()
  useEffect(() => {
    const retrieveAllUsers = async () => {
      try {
        const collectionRef = collection(firestore, 'users')
        const q = query(collectionRef, where('followers', 'array-contains', userAuth.uid))
        const documents = await getDocs(q)
        const users = []
        documents.forEach(doc => {
          if (doc.data().uid != userAuth.uid) {
            users.push(doc.data())
          }
        })
        setAllUsers(users)
        setFilteredUsers(users)
      } catch(error) {
        console.log(error.message)
      }
    }
    const retrieveAllMessages = async () => {
      try {
        const chatRef = collection(firestore, 'chats')
        const q1 = query(chatRef, where('user1', '==', userAuth.uid))
        const q2 = query(chatRef, where('user2', '==', userAuth.uid))
        const messages = []
        const doc1 = await getDocs(q1)
        const doc2 = await getDocs(q2)
        doc1.forEach((doc) => messages.push(doc.data()))
        doc2.forEach((doc) => messages.push(doc.data()))
        setUserChat(messages)
      } catch (error) {
        console.log(error.message)
      }
    }
    if (isOpen) {
      retrieveAllUsers()
    }
    retrieveAllMessages()
    
    
  },[isOpen,onClose,onOpen, setUserChat])
  return (
    <Container maxW={'container.lg'}  h={'100vh'} pos={'relative'} pt={20}>
      <Flex direction={'column'}  maxH={'100vh'} overflowY={'scroll'} gap={5} overflowX={'hidden'}>
        {userChat.map((chat, i) => <ChatFrame chatInfo={chat} key={i.toString()}/>)}
      </Flex>
      <Box position={'sticky'} bottom={0} right={0} ml={1000}  _hover={{transform: 'scale(1.2)'}} transition={'0.2s ease-in-out'} onClick={onOpen}>
        <FcPlus size={50}/>
      </Box>



      <Modal isOpen={isOpen} size={'xl'}  onClose={onCloseModal}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Create a chat</ModalHeader>
          <ModalBody>
            <Flex h={'100vh'} direction={'column'} gap={5}>
              <Input placeholder='Search' 
                       size={'lg'} 
                       variant='flushed' 
                       pr='4.5rem' 
                       type='text' 
                       mr={3} 
                       value={searchInput} 
                       onChange={e => {
                        const searchTerm = e.target.value
                        setSearchInput(searchTerm)
                        setFilteredUsers(allusers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())))
                       }}/>
    
              <Flex direction={'column'} gap={5}>
                {/* if users variable is none, render filteredUsers variable */}            
                {filteredUsers.length == 0
                                          ? 
                                            <Text textAlign={'center'} w={'full'} >User not found</Text>
                                          : 
                                            filteredUsers.map((user, i) => 
                                                                          <SearchedUser username={user.username} profilePicture={user.profilePicture} userId={user.uid} key={i.toString()} startChat={true}/>) }
  
              </Flex>
            </Flex>

          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
              Close
            </Button >
            <Button variant='ghost' 
                   >
                    Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ChatPage
