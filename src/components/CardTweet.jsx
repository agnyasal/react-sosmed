/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { formatDistance } from "date-fns";
import { HiDotsVertical } from "react-icons/hi";
import { baseUrl } from "../utils/config";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const CardTweet = ({ data, getTweets }) => {
  const user = useSelector((state) => state.user);
  const date = formatDistance(new Date(data.createdAt), new Date(), {
    addSuffix: true,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tweet, setTweet] = useState(data.tweet);
  console.log(tweet);

  const handleDelete = async () => {
    try {
      await axios.delete(baseUrl + `/tweets/${data.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      getTweets();
    }
  };

  const handleEdit = async () => {
    try {
      await axios.patch(baseUrl + `/tweets/${data.id}`, {
        tweet: tweet,
      });
      onClose();
      alert("Edit Success");
    } catch (error) {
      console.log(error);
    } finally {
      getTweets();
    }
  };

  return (
    <Box px="4" shadow="sm" h="120px">
      <Flex gap="4" alignItems="center" mb="4" justifyContent="space-between">
        <Link to={`/profile/${data.user.id}`}>
          <Flex gap="4" alignItems="center">
            <Avatar />
            <Text fontSize="18px" fontWeight="bold">
              @{data.user.username}
            </Text>
            <Text>{date}</Text>
          </Flex>
        </Link>

        {user.id === data.user.id ? (
          <Menu>
            <MenuButton>
              <HiDotsVertical />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem onClick={onOpen}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        ) : null}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                onChange={(e) => setTweet(e.target.value)}
                value={tweet}
              />
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleEdit}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Text>{data.tweet}</Text>
    </Box>
  );
};

export default CardTweet;
