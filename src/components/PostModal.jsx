import React, {useEffect, useRef, useState} from 'react'
import {Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody, useDisclosure, Button, Input, Flex, InputGroup, InputRightElement, Text, ModalHeader, Image, IconButton, Box } from '@chakra-ui/react'
import {DeleteIcon} from '@chakra-ui/icons'
import userPostState from '../storage/userPostState'
import useCreatePost from '../hooks/useCreatePost'
import usePreviewImg from '../hooks/usePreviewImg'


const PostModal = () => {
  const {isOpen,onClose, onOpen} = useDisclosure()
  const buttonForModalRef = useRef(null)
  const buttonForPickingImg = useRef(null)
  const postingState = userPostState(state => state.posting)
  const setPostingState = userPostState(state => state.setPosting)
  const {createPost, isPosting} = useCreatePost()
  const [caption, setCaption] = useState('')
  const {seletecImg, handleImageSelect, setSelectedImg} = usePreviewImg()
  useEffect(() => {
    if (postingState) {
      buttonForModalRef.current.click()
    }
  })
  const onCloseModal = () => {
    // if we're in posting progress, we can't close the modal
    if (!isPosting) {
      // when the modal is closed, it should reset everything
      setSelectedImg(null)
      setPostingState(false)
      setCaption('')
      onClose()
    }
  }
  return (
    <>
      <Button hidden ref={buttonForModalRef} onClick={onOpen}/>
      <Modal isOpen={isOpen} size={'xl'}  onClose={onCloseModal}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>Create a post</ModalHeader>
          <ModalBody>
            <Input placeholder='Caption'  
                  size={'lg'}
                  variant={'outline'}
                  type='text' 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}/>
            <Input type='file' variant={'unstyled'} mt={2} onChange={handleImageSelect} ref={buttonForPickingImg}/>
            {seletecImg && 
                          <Box position={'relative'} mt={7} pt={5}>
                            <Image src={seletecImg} />
                            <IconButton
                              onClick={() => {
                                setSelectedImg(null)
                                buttonForPickingImg.current.value = null;
                              }}
                              isRound={true}
                              variant='solid'
                              colorScheme='red'
                              aria-label='Delete image'
                              fontSize='20px'
                              icon={<DeleteIcon/>}
                              position={'absolute'}
                              size={'sm'}
                              top={0}
                              right={0}
                            />
                          </Box>}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onCloseModal}>
              Close
            </Button >
            <Button variant='ghost' 
                    onClick={async () => {
                                    await createPost(caption, seletecImg)
                                    // we want to close the modal after clicking the post btn
                                    onCloseModal()
                                   }} 
                    isLoading={isPosting}>
                          Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PostModal