import React, {useState} from 'react'
import {Box, Flex, Container, Text} from '@chakra-ui/react'
import {BsGrid3X3, BsSuitHeart, BsFillSuitHeartFill} from 'react-icons/bs'
import { TfiLayoutGrid3Alt } from "react-icons/tfi";
import userProfileTabState from '../../storage/userProfileTabState';
const ProfileTab = () => {
  const selectedTab = userProfileTabState(state => state.currentProfileTab)
  const setSelectedTab = userProfileTabState(state => state.setCurrentProfileTab)
  return (
    <Flex
          w={'full'}
          justifyContent={'center'}
          gap={{base:4, sm:10}}
          textTransform={'uppercase'}
          fontWeight={'bold'}
          >
            {/* Posts */}
            <Flex borderTop={selectedTab === 'posts' && '1px white solid'} alignItems={'center'} p={3} gap={1} cursor={'pointer'} _hover={{color: 'gray'}} transition={'.2s ease-in-out'} onClick={() => setSelectedTab('posts')}>
              {selectedTab === 'posts' ? <TfiLayoutGrid3Alt/> : <BsGrid3X3/>}
              <Text fontSize={12} display={{base:'none', sm:'block'}}>
                Posts
              </Text>
            </Flex>
            {/* Liked */}
            <Flex borderTop={selectedTab === 'liked' && '1px white solid'} alignItems={'center'} p={3} gap={1} cursor={'pointer'}  _hover={{color: 'gray'}} transition={'.2s ease-in-out'} onClick={() => setSelectedTab('liked')}>
              {selectedTab === 'liked' ? <BsFillSuitHeartFill/> : <BsSuitHeart/>}
              <Text fontSize={12} display={{base:'none', sm:'block'}}>
                Liked
              </Text>
            </Flex>
    </Flex>
  )
}

export default ProfileTab
