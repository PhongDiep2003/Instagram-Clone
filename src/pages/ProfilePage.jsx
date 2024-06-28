import React from 'react'
import {Box, Flex, Container,Skeleton, SkeletonCircle, Avatar, Text, Link } from '@chakra-ui/react'
import ProfileHeader from '../components/ProfilePage/ProfileHeader'
import ProfileTab from '../components/ProfilePage/ProfileTab'
import ProfilePosts from '../components/ProfilePage/ProfilePosts'
import useFetchProfileInfo from '../hooks/useFetchProfileInfo'
import {Link as RouterLink, useLocation} from 'react-router-dom'
const ProfilePage = () => {
  const {pathname} = useLocation()
  console.log(pathname)
  const {isLoading, userProfile} = useFetchProfileInfo(pathname.split('/')[1])
  return (
    <Container maxW={'container.lg'}>
      {isLoading
        ?
        <>
          <Flex gap={4} py={10} px={4} pl={{base:4, md:10}} w={'full'} mx={'auto'}>
              <SkeletonCircle size={20}/>
              <Flex direction={'column'} w={'full'}>
                <Flex mb={2} alignItems={'center'}>
                  <Skeleton height='10px' w={'150px'} mr={3}/>
                  <Skeleton height='50px' w={'90px'} mr={3}/>
                </Flex>
                <Flex mb={2} alignItems={'center'}>
                  <Skeleton height='10px' w={'50px'} mr={3}/>
                  <Skeleton height='10px' w={'50px'} mr={3}/>
                  <Skeleton height='10px' w={'50px'} mr={3}/>
                </Flex>
              </Flex>
            </Flex>
        </> 
        : 
          userProfile ? 
                      <>
                        {/* Profile Header */}
                        <Flex py={10} px={4} pl={{base:4, md:10}} w={'full'} mx={'auto'}>
                          <ProfileHeader caption={userProfile.bio} name={userProfile.username} numoffollowers={userProfile.followers.length} numoffollowing={userProfile.followings.length} numofposts={userProfile.posts.length}
                          profileUrl={userProfile.profilePicture}/>
                        </Flex>
                        {/* Profile Bottom */}
                        <Flex
                              px={{base:2, sm:4}}
                              maxW={'full'}
                              mx={'auto'}
                              borderTop={'1px solid'}
                              borderColor={'whiteAlpha.300'}
                              direction={'column'}
                              >
                                <ProfileTab/>
                                <ProfilePosts/>
                        </Flex>
                      </>
                      :
                      <Flex py={10} px={4} pl={{base:4, md:10}} w={'full'} mx={'auto'} justifyContent={'center'} alignItems={'center'} direction={'column'} gap={4}>
                        <Avatar src={''} size={'xl'} alt='my profile picture' mr={7}/>
                        <Text fontSize={20} fontWeight={'bold'}>User is not found</Text>
                        <Link to={'/'} _hover={{color:'gray.500'}} as={RouterLink} transition={'.2s ease-in-out'} >
                          Go Home
                        </Link>
                      </Flex>
      
      }
    </Container>



  )
}

export default ProfilePage
