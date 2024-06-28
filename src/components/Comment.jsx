import React from 'react'
import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useCalculatePassedDatesSincePostCreated from '../hooks/useCalculatePassedDatesSincePostCreated';
import useGetPostOwner from '../hooks/useGetPostOwner';
const Comment = ({comment}) => {
	const {calculatePassedDates} = useCalculatePassedDatesSincePostCreated()
	const {postOwner} = useGetPostOwner(comment.createdBy)
  return (
		postOwner &&
    <Flex gap={2}>
			<Link to={`/sfbtch`}>
				<Avatar  size={"sm"} src={postOwner.profilePicture} />
			</Link>
			<Flex  justifyContent={'space-between'} w={'full'}>
				<Flex gap={2}>
					<Link to={`/sfbtch`}>
						<Text fontWeight={"bold"} fontSize={14}>
							{postOwner.username}
						</Text>
					</Link>
					<Text fontSize={14} w={'300px'}>{comment.comment}</Text>
				</Flex>
				<Text fontSize={14} color={"gray"} marginLeft={'auto'} mr={5}>
					{calculatePassedDates(comment.date)}
				</Text>
			</Flex>
		</Flex>
  )
}

export default Comment