import React from 'react'
import {Flex, VStack, Text, Link, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import SuggestedHeader from './SuggestedHeader'
import SuggestedUser from './SuggestedUser'
import useFetchSuggestedUsers from '../../hooks/useFetchSuggestedUsers'
const SuggestedUsers = () => {
  const {isGettingSuggestedUsers, suggestedUsers} = useFetchSuggestedUsers()
  return (
    <VStack gap={4} py={8} px={6}>
      <SuggestedHeader/>
      {isGettingSuggestedUsers ? 
                                  <>
                                    {Array(3).fill('').map((_, i) => 
                                                                      <Flex justifyContent={'space-between'} w={'full'} key={i.toString()}>
                                                                        <Flex alignItems={'center'} justifyContent={'center'}>
                                                                          <SkeletonCircle size='10' />
                                                                          <Flex>
                                                                            <SkeletonText height='20px' width={20} noOfLines={2} ml={3}/>
                                                                          </Flex>
                                                                        </Flex>
                                                                        <Skeleton height='30px' w={'60px'} />
                                                                      </Flex>)}
                                  </>
                               :
                                suggestedUsers.length > 0 &&
                                  <>
                                      <Flex justifyContent={'space-between'} w={'full'} mt={5}> 
                                        <Text color={'gray.500'} fontSize={12} fontWeight={'bold'}>Suggested for you</Text>
                                        <Text fontSize={12} fontWeight={'bold'} _hover={{color: 'gray.400'}}>See all</Text>
                                      </Flex>
                                      {suggestedUsers.map((user) => <SuggestedUser followers={user.followers.length} profilePicture={user.profilePicture} username={user.username} uid={user.uid}/>)}
                                      <Text color={'gray.500'} fontSize={12} w={'full'} mt={5}>
                                        @ 2024 Built By {" "} 
                                        <Link  href={'https://phongwebsite-b45c0.web.app'} target='_blank' color={'blue.800'} _hover={{color: 'white'}} transition={'.2s ease-in-out'} cursor={'pointer'}>PhongDiep</Link>
                                      </Text>
                                  </>}
    
    </VStack>
  )
}

export default SuggestedUsers
