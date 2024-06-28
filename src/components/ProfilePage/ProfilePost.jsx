import React from 'react'
import {Grid, Skeleton, Box, Image, GridItem, Flex, Text} from '@chakra-ui/react'
import {AiFillHeart} from 'react-icons/ai'
import {FaComment} from 'react-icons/fa'
const ProfilePost = ({url, numsOfLikes, numsOfComments}) => {
  return (
    <GridItem cursor={'pointer'} borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'} aspectRatio={1/1} position={'relative'}>
      <Flex position={'absolute'} 
            opacity={0}
            _hover={{opacity: 1}}
            transition={".2s ease-in-out"}
            zIndex={1}
            bg={'blackAlpha.700'}
            justifyContent={'space-around'}
            alignItems={'center'}
            top={0}
            left={0}
            right={0}
            bottom={0}
            >
              <Flex alignItems={'center'}>
                <AiFillHeart/>
                <Text fontSize={12} fontWeight={'bold'} ml={1}>{numsOfLikes} likes</Text>
              </Flex>

              <Flex alignItems={'center'}>
                <FaComment/>
                <Text fontSize={12} fontWeight={'bold'} ml={1}>{numsOfComments} comments</Text>
              </Flex>
      </Flex>

      <Image src={url} width={'100%'} height={'100%'} objectFit={'cover'}/>
    </GridItem>
    
  )
}

export default ProfilePost
