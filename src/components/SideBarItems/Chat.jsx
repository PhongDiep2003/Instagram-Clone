import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Link, Tooltip} from '@chakra-ui/react';
import {NotificationsLogo} from '../../assets/constants'
import { RiWechatLine } from "react-icons/ri";
const Chat = () => {
  return (
          <Tooltip hasArrow label={'Chat'} placement='right' ml={1} openDelay={500} display={{base: 'block', md: 'none'}}>
            <Link
                  display={'flex'}
                  to={'/chat'}
                  as={RouterLink}
                  alignItems='center'
                  gap={4}
                  _hover={{bg:"whiteAlpha.400"}}
                  borderRadius={6}
                  p={2}
                  w={{base:10, md:'full'}}
                  justifyContent={{base: 'center', md:'flex-start'}}>
                    <RiWechatLine size={30} />
                  <Box display={{base:'none', md:'block'}}>
                      Chat
                  </Box>
            </Link>
          </Tooltip>
  )
}

export default Chat