import React from 'react'
import {Box, Flex, Container, VStack, Text, Avatar, Link} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import useSignout from '../../hooks/useSignout'
import userAuthStore from '../../storage/useStorage'
const SuggestedHeader = () => {
  const user = userAuthStore(state => state.user)
  const {logout } = useSignout()
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${user.username}`} as={RouterLink}>
          <Avatar size={'sm'} src={user.profilePicture} alt={'user profile picture'}/>
        </Link>
        <Text fontSize={12} fontWeight={'bold'} cursor={'pointer'}>
          {user.username}
        </Text>
      </Flex>

      <Link
            as={RouterLink}
            to={'/auth'}
            fontSize={14}
            fontWeight={'medium'}
            cursor={'pointer'}
            color={'blue.500'} 
            _hover={{color:'white'}} 
            transition={'0.2s ease-in-out'}
            onClick={logout}>
              Log out
      </Link>

    </Flex>
  )
}

export default SuggestedHeader
