import React, {useState} from 'react'
import { Flex, Text, Avatar, Button} from '@chakra-ui/react'
import useFollowUsers from '../../hooks/useFollowUsers'
const SuggestedUser = ({profilePicture, username, followers, uid}) => {
  const {followUser, isUpdatingFollowing} = useFollowUsers(uid)
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar alt='suggested users profile picture' size={'sm'} src={profilePicture}></Avatar>
        <Flex justifyContent={'space-between'} direction={'column'} gap={1}>
          <Text fontSize={12} fontWeight={'bold'}>{username}</Text>
          <Text fontSize={10} color={'gray.500'}>{followers} followers</Text>
        </Flex>
      </Flex>
      <Button fontSize={14} color={'blue.500'} fontWeight={'600'} cursor={'pointer'} _hover={{color:'white'}} transition={'0.2s ease-in-out'} bg={'transparent'} w={'42px'} height={'30px'} onClick={followUser} p={0} overflow={'hidden'} isLoading={isUpdatingFollowing}>
        Follow
      </Button>

    </Flex>
  )
}

export default SuggestedUser
