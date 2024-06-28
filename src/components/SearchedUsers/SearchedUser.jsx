import React from 'react'
import {Flex,Text, Avatar, Circle} from '@chakra-ui/react'
import useFollowUsers from '../../hooks/useFollowUsers'
import { Link } from 'react-router-dom'
import { FcPlus } from "react-icons/fc";
import useCreateChat from '../../hooks/useCreateChat';
const SearchedUser = ({username, profilePicture, userId, startChat}) => {
  const {followUser, isFollowing} = useFollowUsers(userId)
  const {createChat} = useCreateChat()
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${username}`}>
          <Avatar alt={'searched user'} size={'sm'} src={profilePicture}></Avatar>
        </Link>
        <Flex justifyContent={'space-between'} direction={'column'} gap={1}>
          <Link to={`/${username}`}>
            <Text fontSize={12} fontWeight={'bold'}>{username}</Text>
          </Link>
        </Flex>
      </Flex>
      {!startChat && <Text fontSize={14} color={ isFollowing ? 'blue.300' : 'white'} fontWeight={'600'} cursor={'pointer'} bg={'transparent'} onClick={followUser} _hover={{color:'gray.500'}} transition={'0.2s ease-in-out'}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Text>
      }
      {startChat && <Circle  _hover={{transform: 'scale(1.1)'}} transition={'0.2s ease-in-out'} onClick={() => createChat(userId)}>
        <FcPlus size={30}/>
      </Circle>
      }
    </Flex>
  )
}

export default SearchedUser
