import React, {useEffect, useRef, useState} from 'react'
import {Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody, useDisclosure, Button, Input, Flex, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react'
import userSearchState from '../storage/userSearchState'
import SearchedUser from './SearchedUsers/SearchedUser'
import useSearchUsers from '../hooks/useSearchUsers'
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'
import userAuthStore from '../storage/useStorage'
const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = useRef(null)
  const [searchInput, setSearchInput] = useState('')
  const searchingState = userSearchState(state => state.searching)
  const setSearchingState = userSearchState(state => state.setSearching)
  const {isSearching, searchUsers, users, setUsers, searched, setSearched} = useSearchUsers()
  const [filteredUsers, setFilteredUsers] = useState([])
  const [allusers, setAllUsers] = useState([])
  const userAuth = userAuthStore(state => state.user)
  useEffect(() => {
    const retrieveAllUsers = async () => {
      try {
        const collectionRef = collection(firestore, 'users')
        const documents = await getDocs(collectionRef)
        const users = []
        documents.forEach(doc => {
          if (doc.data().uid != userAuth.uid) {
            users.push(doc.data())
          }
        })
        console.log(users)
        setAllUsers(users)
        setFilteredUsers(users)
      } catch(error) {
        console.log(error.message)
      }
    }

    if (searchingState) {
      retrieveAllUsers()
      buttonRef.current.click()
    }
  },[searchingState])
  return (
    <>
       <Button hidden ref={buttonRef} onClick={onOpen}/>
      <Modal isOpen={isOpen} size={'xl'}  onClose={() => {
        setSearchInput('')
        setUsers([])
        setSearchingState(false)
        setSearched(false)
        onClose()
      }}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Flex h={'100vh'} direction={'column'} gap={5}>
              <InputGroup>
                <Input placeholder='Search' 
                       size={'lg'} 
                       variant='flushed' 
                       pr='4.5rem' 
                       type='text' 
                       mr={3} 
                       value={searchInput} 
                       onChange={e => {
                        const searchTerm = e.target.value
                        setSearched(false)
                        setSearchInput(searchTerm)
                        setFilteredUsers(allusers.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())))
                       }}/>
                <InputRightElement width='5rem'>
                  <Button h='full' size='md' onClick={() => searchUsers(searchInput)} _hover={{bg: 'blue.400'}} transition={'0.2s ease-in-out'}>
                    Search
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Flex direction={'column'} gap={5} alignItems={ isSearching && 'center'}>
                {/* if users variable is none, render filteredUsers variable */}
                {isSearching && <Spinner
                                        speed='0.65s'
                                        color='blue.500'
                                        size='xl'/> }
                {users.length == 0 ?
                                      // if length of filtered users is 0, render no user found
                                      filteredUsers.length == 0 || searched
                                                                ? 
                                                                  <Text textAlign={'center'} w={'full'} >User not found</Text>
                                                                : 
                                                                  filteredUsers.map((user, i) => 
                                                                                                <SearchedUser username={user.username} profilePicture={user.profilePicture} userId={user.uid} key={i.toString()}/>)

                                   : 
                                      users.map((user, i) => 
                                      <SearchedUser username={user.username} profilePicture={user.profilePicture} userId={user.uid} key={i.toString()}/>)
                                    }
                  
                
              </Flex>

            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
              setSearchInput('')
              setUsers([])
              setSearchingState(false)
              setSearched(false)
              onClose()
            }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
    </>
    
  )
}

export default SearchModal
