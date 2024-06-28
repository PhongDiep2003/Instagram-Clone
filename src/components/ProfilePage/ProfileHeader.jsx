import React, {useState, useRef} from 'react'
import {Flex, Avatar, Text, Button, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Center} from '@chakra-ui/react'
import userAuthStore from '../../storage/useStorage'
import usePreviewImg from '../../hooks/usePreviewImg'
import useUpdateEditProfile from '../../hooks/useUpdateEditProfile'
import useFollowUsers from '../../hooks/useFollowUsers'
import userProfileStore from '../../storage/userProfileStore'
const ProfileHeader = ({name, numofposts,numoffollowers, numoffollowing, caption, profileUrl}) => {
  const changeFileBtnRef = useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {seletecImg, handleImageSelect} = usePreviewImg()
  const userAuth = userAuthStore(state => state.user)
  const isOnYourProfile = userAuth && userAuth.username === name
  const {isUpdating, updateEditProfile} = useUpdateEditProfile()
  const initialInfo = {
    username: userAuth.username,
    bio: userAuth.bio
  }
  const profile = userProfileStore(state => state.userProfile)
  const { followUser, isFollowing, isUpdatingFollowing } = useFollowUsers(profile.uid)
  const [inputs, setInputs] = useState(initialInfo)
  return (
    <>
      <Flex w={'full'}>
        <Avatar src={profileUrl} size={'xl'} alt='my profile picture' mr={7}/>
        <Flex direction={'column'} justifyContent={'space-around'}>
          <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={15} mr={3}>{name}</Text>
              {isOnYourProfile ? 
                                  <Button size='sm' bg={'white'} color={'black'} _hover={{bg: 'gray'}}  onClick={onOpen}>
                                    Edit Button
                                  </Button>
                               :  
                                  <Button size='sm' bg={isFollowing ? 'blue.300' : 'white'} color={'black'} _hover={{bg: 'gray'}} onClick={followUser} isLoading={isUpdatingFollowing}>
                                      {isFollowing ? 'Unfollow' : 'Follow'}
                                  </Button>
                                          }
          </Flex>
          <Flex w={'full'} justifyContent={'space-between'}>
            <Text fontSize={10} fontWeight={'bold'} mr={2}>{numofposts}  <Text as={'span'} fontSize={10} color={'gray.300'}>Posts</Text></Text>
            <Text fontSize={10} fontWeight={'bold'} mr={2}>{numoffollowers}  <Text as={'span'} color={'gray.300'} fontSize={10}>Followers</Text></Text>
            <Text fontSize={10} fontWeight={'bold'}>{numoffollowing}  <Text as={'span'} color={'gray.300'} fontSize={10}>Followings</Text></Text>
          </Flex>
          <Text fontSize={15}>{caption}</Text>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
              <ModalHeader>Edit Profile</ModalHeader>
              <ModalCloseButton/>
              <ModalBody>
              <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                pb={6}
               >
                <FormControl>
                  <Stack direction={['column', 'row']} spacing={6}>
                    <Center>
                      <Avatar size="xl" src={seletecImg || profileUrl}/>
                    </Center>
                    <Center w="full">
                      <Button w="full" onClick={() => changeFileBtnRef.current.click()}>Change Image</Button>
                      <Input type='file' hidden ref={changeFileBtnRef} onChange={handleImageSelect}/>
                    </Center>
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel>User name</FormLabel>
                  <Input
                    placeholder="UserName"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={inputs.username}
                    onChange={e => setInputs({...inputs, username: e.target.value})}
                  />
                </FormControl>
                <FormControl >
                  <FormLabel>Bio</FormLabel>
                  <Input
                    placeholder="Bio"
                    _placeholder={{ color: 'gray.500' }}
                    type="text"
                    value={inputs.bio}
                    onChange={e => setInputs({...inputs, bio: e.target.value})}
                  />
                </FormControl>
                <ModalFooter>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    bg={'red.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'red.500',
                    }} onClick={() => {
                      if (!isUpdating) {
                        setInputs(initialInfo)
                        onClose()
                      }
                    }}>
                    Cancel
                  </Button>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    w="full"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={() => {
                      updateEditProfile(inputs, seletecImg)
                      onClose()
                    }}
                    isLoading={isUpdating}>
                    Submit
                    </Button>
                  </Stack>
                </ModalFooter>
                </Stack>
              </ModalBody>
          </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileHeader
