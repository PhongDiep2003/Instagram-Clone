import React, {useState} from 'react'
import {Button, Input, Alert, AlertIcon, AlertTitle, AlertDescription,} from '@chakra-ui/react'
import useLogin from '../hooks/useLogin'
const Login = () => {
  const {error,loading,login} = useLogin()
  const initialState = {
    'email': '',
    'password': '',
  }
  const [inputs, setInputs] = useState(initialState)
  return (
    <>
      <Input placeholder='Email' fontSize={14} type='email' value={inputs.email} onChange={(e) => setInputs({...inputs, email: e.target.value})} border={'1px solid black'} color={'black'} _hover={{borderColor:'black'}}/>
      <Input placeholder='Password' fontSize={14} type='password' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})} border={'1px solid black'} color={'black'} _hover={{borderColor:'black'}}/>
      <Button w={"full"} colorScheme='blue' size={'sm'} fontSize={14} isLoading={loading} onClick={() => login(inputs)}>
        Login
      </Button>
      {error && <Alert status='error' fontSize={13} p={2} borderRadius={4}>
                  <AlertIcon />
                  {error.message}
                </Alert>}
    </>

  )
}
export default Login
