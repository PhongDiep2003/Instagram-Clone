import React, {useState} from 'react'
import {Flex, VStack, Box, Image, Text} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import SignInByGoogleButton from './SignInByGoogleButton';
const AuthForm = () => {
  // const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5} backgroundColor={'#ffe4b5'}>
        <VStack spacing={4}>
          <Image src='/logo.png' h={24} cursor={'pointer'} alt='Instagram'/>

          {isLogin ? <Login/> : <Signup/>}

          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={'full'}>
            <Box flex={2} h={'1px'} bg={'gray.400'}/>
            <Text mx={1} color={'black'}>Or</Text>
            <Box flex={2} h={'1px'} bg={'gray.400'}/>
          </Flex>
          <SignInByGoogleButton text={isLogin ? 'Login' : 'Signup'}/>
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize='sm' color={'black'}>{isLogin ? "Don't have an account?" : "Already have an account?"}</Text>
          <Text fontSize='sm' color={'blue.500'} onClick={() => setIsLogin(!isLogin)} cursor={'pointer'}>{isLogin ? "Sign up" : "Log in"}</Text>
        </Flex>

      </Box>
    </>

  )
}
export default AuthForm