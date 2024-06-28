import React from 'react'
import {Box, Flex, Link, Tooltip} from '@chakra-ui/react';
import Home from './SideBarItems/Home';
import Create from './SideBarItems/Create';
import Search from './SideBarItems/Search';
import Chat from './SideBarItems/Chat';
import Profile from './SideBarItems/Profile';
import {Link as RouterLink} from 'react-router-dom'
import { InstagramLogo, InstagramMobileLogo} from '../assets/constants';
import { SlLogout } from "react-icons/sl";
import useSignout from '../hooks/useSignout';
const SideBar = () => {
  const {logout} = useSignout()
  return (
    <Box 
        height={"100vh"}
        borderRight={"1px solid"}
        borderColor={"whiteAlpha.300"}
        py={8}
        position={"sticky"}
        top={0}
        left={0}
        px={{base:2, md: 4}}>
        
        <Flex direction={'column'} gap={10} w={'full'} height={'full'}>
          <Link to={'/'} as={RouterLink} pl={2} display={{base:'none', md:'block'}} cursor={'pointer'}>
            <InstagramLogo/>
          </Link>
          <Link to={'/'} as={RouterLink} pl={2} display={{base:'base', md:'none'}} cursor={'pointer'}
          borderRadius={6} _hover={{bg:"whiteAlpha.200"}} w={{base:10}}>
            <InstagramMobileLogo/>
          </Link>
          <Flex direction={'column'} gap={5} cursor={'pointer'}>
              <Home/>
              <Search/>
              <Chat/>
              <Create/>
              <Profile/>
          </Flex>
          <Tooltip hasArrow label={'Log out'} placement='right' ml={1} openDelay={500} display={{base: 'block', md: 'none'}}>
                <Link
                      display={'flex'}
                      to={'/auth'}
                      as={RouterLink}
                      alignItems='center'
                      gap={4}
                      _hover={{bg:"whiteAlpha.400"}}
                      borderRadius={6}
                      p={2}
                      w={{base:10, md:'full'}}
                      justifyContent={{base: 'center', md:'flex-start'}}
                      marginTop={'auto'}>

                      <SlLogout size={25} 
                      onClick={logout}/>
                      <Box display={{base:'none', md:'block'}}>
                          Log out
                      </Box>
                </Link>
          </Tooltip>
        </Flex>

    </Box>
  )
}
export default SideBar;