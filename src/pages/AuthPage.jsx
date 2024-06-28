import React, {useState, useEffect} from 'react'
import {Flex, Container, VStack, Box, Image} from '@chakra-ui/react'
import AuthForm from '../components/AuthForm'
const AuthPage = () => {
  useEffect(() => {
    document.title = 'Instagram - Auth'
  }, [])
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignContent={"center"} px={4} backgroundImage={'/instagrambg.png'}>
      <Container maxW={"container.md"} padding={0} >
       <Flex justifyContent={'center'} alignItems={'center'} paddingTop={70}>
         {/* Left side */}
         {/* in a small screen like mobile, image should not displayed (base). However for screen that have size of tablet or above, display image (md) */}
       
        {/* Right hand */}
        <VStack spacing={4} align={'stretch'}>
          <AuthForm/>
          {/* Box acts as a div element */}
          <Flex gap={5} justifyContent={'center'}>
            <Image src='/playstore.png' h={'10'} alt='Playstore logo'/>
            <Image src='/microsoft.png' h={'10'} alt='Microsoft logo'/>
          </Flex>
        </VStack>
       </Flex>
      </Container>
    </Flex>
  )
}
export default AuthPage;