import React, {useState, useEffect} from 'react'
import {Grid, Skeleton, Box, Image, GridItem} from '@chakra-ui/react'
import ProfilePost from './ProfilePost'
import useFetchProfilePosts from '../../hooks/useFetchProfilePosts'
import userProfileStore from '../../storage/userProfileStore'
import usePostStorage from '../../storage/usePostStorage'
const ProfilePosts = () => {
  const profile = userProfileStore(state => state.userProfile)
  const {isFetchingMyPosts} = useFetchProfilePosts(profile.uid)
  const postStorage = usePostStorage(state => state.postStorage)
  return (
    <Grid 
          templateColumns={{
            sm:'repeat(1, 1fr)',
            md: 'repeat(3,1fr)'
            }}
           
           columnGap={1}>
            {isFetchingMyPosts ? Array(4).fill('').map((_,index) => (
              <Skeleton w={'full'} key={index.toString()}>
                  <Box h={'300px'}></Box>
              </Skeleton>
            )) : postStorage.length > 0 &&
              <>
                {postStorage.map((post, index) => <ProfilePost url={post.url} numsOfComments={post.comments.length} numsOfLikes={post.likes.length} key={index.toString()}/>)}
              </>
            }
    </Grid>
    
  )
}

export default ProfilePosts
