import React from 'react'
import {Flex,Box} from '@chakra-ui/react'
import SideBar from '../components/SideBar'
import {useLocation} from 'react-router-dom'
import userAuthStore from '../storage/useStorage'
import SearchModal from '../components/SearchModal'
import PostModal from '../components/PostModal'
const PageLayout = ({children}) => {
  const {pathname} = useLocation()
  const user = userAuthStore(state => state.user)
  const canRenderSideBar = pathname != '/auth' && user
  return (
    <Flex>
      {/* Sidebar */}
      {canRenderSideBar && 
      <Box w={{base: "70px", md: "240px"}}>
        <SideBar/>
      </Box>}
      {/* Children */}
      <Box flex={1} w={{base: "calc(100%-70px)", md: "calc(100% - 240px)"}}>
        {children}
      </Box>
      <SearchModal/>
      <PostModal/>
    </Flex>
  )
}
export default PageLayout