import React, {useState} from 'react'
import {Button, Input, Alert, AlertIcon} from '@chakra-ui/react'
import useSignup from '../hooks/useSignup'
const Signup = () => {
  const initialState = {
    'email': '',
    'password': '',
    'confirmPassword': '',
    'username' : ''
  }
  const {loading, error, signup} = useSignup()
  const [inputs, setInputs] = useState(initialState)
  return (
    <>
      <Input placeholder='Email' fontSize={14} type='email' value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} border={'1px solid black'} color={'black'} _hover={{borderColor:'black'}}/>
      <Input placeholder='Username' fontSize={14} type='text' value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} border={'1px solid black'} color={'black'} _hover={{borderColor:'black'}}/>
      <Input placeholder='Password' fontSize={14} type='password' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} border={'1px solid black'} color={'black'} _hover={{borderColor:'black'}}/>
      <Input placeholder='Confirm Password' fontSize={14} type='password' value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})} border={'1px solid black'} color={'black'} _hover={{borderColor:'black'}}/>

      {error && <Alert status='error' fontSize={13} p={2} borderRadius={4}>
          <AlertIcon fontSize={12}/>
          {error.message}
        </Alert>}

      <Button w={"full"} colorScheme='blue' size={'sm'} fontSize={14} isLoading={loading} onClick={() => signup(inputs)}>
        Sign Up
      </Button>
    </>
  )
}

export default Signup
