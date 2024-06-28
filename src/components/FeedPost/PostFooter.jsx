import React, {useState, useEffect, useRef} from 'react'
import {Box, Flex, Container, Image, Text, Input, InputRightElement, InputGroup, Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,useDisclosure} from '@chakra-ui/react'
import { NotificationsLogo, UnlikeLogo, CommentLogo} from '../../assets/constants'
import useGetPostOwner from '../../hooks/useGetPostOwner'
import Comment from '../Comment'
import useCreateCommand from '../../hooks/useCreateCommand'
import userAuthStore from '../../storage/useStorage'
import useHandleLike from '../../hooks/useHandleLike'
const PostFooter = ({postInfo}) => {
  const {isPostingComment, postComment} = useCreateCommand()
  const {handleLike} = useHandleLike()
  const commentEnd = useRef(null)
  const {postOwner} = useGetPostOwner(postInfo.createdBy)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [inputInsideModal, setInputInsideModal] = useState('')
  const [inputOutsideModal, setInputOutsideModal] = useState('')
  const userAuth = userAuthStore(state => state.user)
  const onCloseModal = () => {
    setInputInsideModal('')
    onClose()
  }
  const onOpenModal = () => {
    setInputOutsideModal('')
    onOpen()
  }
  useEffect(() => {
    const scrollToBottom = () => {
      commentEnd.current.scrollIntoView()
    }
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom()
      }, 100)
    }
  })

  const handlePostComment = async (commentContent) => {
    try {
      if (!commentContent) return
      await postComment(postInfo.postId, commentContent) 
    } catch(error) {
      console.log(error.message)
    } finally {
      setInputInsideModal('')
      setInputOutsideModal('')
    }

  }
  return (
    postOwner &&
    <>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mt={2} mb={2}>
        <Box cursor={'pointer'} onClick={() => handleLike(postInfo)} _hover={{transform: 'scale(1.2)'}} transition={'0.2s ease-in-out'} >
          {postInfo.likes.includes(userAuth.uid) ? <UnlikeLogo/> : <NotificationsLogo/>}
        </Box>
        <Box cursor={'pointer'} onClick={onOpenModal} _hover={{transform: 'scale(1.2)'}} transition={'0.2s ease-in-out'} >
          <CommentLogo/>
        </Box>
      </Flex>
      <Text fontSize={12}>{postInfo.likes.length} likes</Text>
      <Text fontSize={12} fontWeight={'bold'}>
        {postOwner.username} {" "} 
        <Text as={'span'} fontWeight={'normal'}>
          {postInfo.caption}
        </Text>
      </Text>
      <Text color={'gray'} fontSize={12} cursor={'pointer'} _hover={{color: 'gray.500', fontWeight:'bold'}} transition={'0.2s ease-in-out'} onClick={onOpenModal} >
        View all {postInfo.comments.length} comments
      </Text>
      <InputGroup>
        <Input placeholder='Add a comment...' variant={'flushed'} fontSize={14} value={inputOutsideModal} onChange={e => setInputOutsideModal(e.target.value)}/>
        <InputRightElement>
          <Button fontSize={14} color={'blue.500'} fontWeight={'600'} cursor={'pointer'} _hover={{color:'white'}} transition={'0.2s ease-in-out'} bg={'transparent'} isLoading={isPostingComment} onClick={() => handlePostComment(inputOutsideModal)}>
            Post
          </Button>
        </InputRightElement>
      </InputGroup>


      <Modal isOpen={isOpen} onClose={onCloseModal} motionPreset='slideInLeft'>
			<ModalOverlay />
			<ModalContent bg={"black"} border={"1px solid gray"} maxW={"600px"}>
				<ModalHeader>Comments</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Flex
						mb={4}
						gap={4}
						flexDir={"column"}
						maxH={"350px"}
						overflowY={"auto"}
					>
            {console.log(postInfo.comments)}
            {postInfo.comments && postInfo.comments.map((comment, i) => <Comment key={i.toString()} comment={comment}/>)}
            <Box ref={commentEnd}></Box>
					</Flex>
          <InputGroup>
            <Input placeholder='Add a comment...' type='text' fontSize={15} value={inputInsideModal} onChange={e =>  setInputInsideModal(e.target.value)}/>
            <InputRightElement>
              <Button fontSize={14} color={'blue.500'} fontWeight={'600'} cursor={'pointer'} _hover={{color:'white'}} transition={'0.2s ease-in-out'} bg={'transparent'} isLoading={isPostingComment} onClick={() => handlePostComment(inputInsideModal)}>
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
				</ModalBody>
			</ModalContent>
		</Modal>
    </>
  )
}

export default PostFooter;
