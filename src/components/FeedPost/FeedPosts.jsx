import React from 'react'
import FeedPost from './FeedPost';
import {Flex, VStack, Skeleton, SkeletonCircle, SkeletonText, Box} from '@chakra-ui/react'
import useFetchPosts from '../../hooks/useFetchPosts';
import usePostStorage from '../../storage/usePostStorage';
const FeedPosts = () => {
  const {isFetchingPosts} = useFetchPosts()
  const postStorage = usePostStorage(state => state.postStorage)
  return (
    <Flex direction={'column'}>
      {isFetchingPosts ? 
                    Array(4).fill(1).map((_,index) => 
                                              <VStack key={index.toString()} gap={4} alignItems={'flex-start'} mb={10}>
                                                <Flex gap={2}>
                                                  <SkeletonCircle size={10}/>
                                                  <VStack gap={2} alignItems={'flex-start'}>
                                                    <Skeleton height={'10px'} w={'200px'}/>
                                                    <Skeleton height={'10px'} w={'200px'}/>
                                                  </VStack>
                                                </Flex>  
                                                <Skeleton w={'full'}> 
                                                  <Box h={'500px'}/>
                                                </Skeleton>    
                                              </VStack>)
                  : postStorage.length > 0 && 
                                        postStorage.map((post, index) => <FeedPost postInfo={post} key={index.toString()}/>)}
    </Flex>
  )
}

export default FeedPosts;
