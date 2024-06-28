import React from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Link, Tooltip} from '@chakra-ui/react';
import {SearchLogo} from '../../assets/constants'
import userSearchState from '../../storage/userSearchState';
const Search = () => {
  const setSearchingState = userSearchState(state => state.setSearching)
  return (
          <Tooltip hasArrow label={'Search'} placement='right' ml={1} openDelay={500} display={{base: 'block', md: 'none'}}>
            <Link
                  display={'flex'}
                  to={null}
                  as={RouterLink}
                  alignItems='center'
                  gap={4}
                  _hover={{bg:"whiteAlpha.400"}}
                  borderRadius={6}
                  p={2}
                  w={{base:10, md:'full'}}
                  justifyContent={{base: 'center', md:'flex-start'}}
                  onClick={() => setSearchingState(true)}>
                    <SearchLogo/>
                  <Box display={{base:'none', md:'block'}}>
                      Search
                  </Box>
            </Link>
          </Tooltip>
  )
}

export default Search
