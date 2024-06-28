import React from 'react'
import {Box, Flex, Avatar, Text} from '@chakra-ui/react'
import userAuthStore from '../storage/useStorage'
const MessageBox = ({message, user}) => {
  const userAuth = userAuthStore(state => state.user)
  const isMyMessage = userAuth && user && userAuth.uid === user.uid
  return (
    <Flex  gap={3} w={'full'} alignItems={'center'} direction={!isMyMessage && 'row-reverse'}>
        <Avatar alt={'user profile picture'} size={'sm'} src={user.profilePicture}></Avatar>
        <Text bg={'#f2f2f2'} color={'black'} p={3} maxWidth={'250px'}>{message}</Text>
    </Flex>
  )
}

export default MessageBox
