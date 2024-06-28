import React from 'react'
import {Box, Flex, Container, Avatar, Text, Button} from '@chakra-ui/react'
import useGetPostOwner from '../../hooks/useGetPostOwner'
import useCalculatePassedDatesSincePostCreated from '../../hooks/useCalculatePassedDatesSincePostCreated'
import userAuthStore from '../../storage/useStorage'
import useFollowUsers from '../../hooks/useFollowUsers'
import { Link } from 'react-router-dom'
const PostHeader = ({postInfo}) => {
  console.log(postInfo)
  const {postOwner} = useGetPostOwner(postInfo.createdBy)
  const {calculatePassedDates} = useCalculatePassedDatesSincePostCreated()
  const userAuth = userAuthStore(state => state.user)
  const {isUpdatingFollowing, followUser, isFollowing} = useFollowUsers(postInfo.createdBy)
  return (
    postOwner &&
    <Flex alignItems={'center'} justifyContent={'space-between'}>
      <Flex gap={3} alignItems={'center'}>
        <Link to={`/${postOwner.username}`}>
          <Avatar size={'sm'} src={postOwner.profilePicture} alt={'user profile picture'}/>
        </Link>
        <Link to={`/${postOwner.username}`}>
          <Text fontWeight={'bold'} fontSize={12}>{postOwner.username}</Text>
        </Link>
        <Text color={'gray.500'} fontWeight={'bold'} fontSize={12}>{calculatePassedDates(postInfo.date)}</Text>
      </Flex>
      {/* don't render follow and unfollow button for our own post */}
      {userAuth.uid !== postOwner.uid && 
                                          <Button fontSize={14} color={'blue.500'} fontWeight={'600'} cursor={'pointer'} _hover={{color:'white'}} transition={'0.2s ease-in-out'} bg={'transparent'} w={'60px'} height={'30px'} onClick={followUser} p={0} overflow={'hidden'} isLoading={isUpdatingFollowing}>
                                          {isFollowing ? 'Unfollow' : 'Follow'}
                                          </Button> 
      }
    </Flex>
  )
}
export default PostHeader
