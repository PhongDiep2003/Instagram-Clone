import React from 'react'
import {Flex, Image, Text, Alert, AlertIcon} from '@chakra-ui/react'
import useGoogleSignin from '../hooks/useGoogleSignin'
const SignInByGoogleButton = ({text}) => {
  const {error, useGoogleAuth} = useGoogleSignin()
  return (
    <>
      <Flex>
        <Image src='/google.png' w={5} alt='Google logo'/>
        <Text mx='2' color={'blue.500'} _hover={{color: 'white'}} transition={'.2s ease-in-out'} onClick={useGoogleAuth} cursor={'pointer'}>{text} with Google </Text>
      </Flex>
      {error && <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12}/>
          {error.message}
        </Alert>}
    </>
  )
}

export default SignInByGoogleButton
