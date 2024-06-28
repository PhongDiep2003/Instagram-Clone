import React from 'react'
import PostHeader from './PostHeader'
import PostFooter from './PostFooter'
import {Box,Image} from '@chakra-ui/react'
const FeedPost = ({postInfo}) => {
  return (
    <Box mb={6}>
      <PostHeader postInfo={postInfo}/>
      <Box mt={2}>
        <Image src={postInfo.url}/>
      </Box>
      <PostFooter postInfo={postInfo}/>
    </Box>
  )
}

export default FeedPost
