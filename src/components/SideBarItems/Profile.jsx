import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Link, Tooltip, Avatar} from '@chakra-ui/react';
import userAuthStore from '../../storage/useStorage';
const Profile = () => {
  const userAuth = userAuthStore(state => state.user)
  return (
          <Tooltip hasArrow label={'Profile'} placement='right' ml={1} openDelay={500} display={{base: 'block', md: 'none'}}>
            <Link
                  display={'flex'}
                  to={`/${userAuth.username}`}
                  as={RouterLink}
                  alignItems='center'
                  gap={3.5}
                  _hover={{bg:"whiteAlpha.400"}}
                  borderRadius={6}
                  p={1}
                  w={{base:10, md:'full'}}
                  justifyContent={{base: 'center', md:'flex-start'}}
                  >
                  <Avatar size={'sm'} alt={'profile picture'} src={userAuth.profilePicture} />
                  <Box display={{base:'none', md:'block'}}>
                    Profile
                  </Box>
            </Link>
          </Tooltip>
  )
}

export default Profile
