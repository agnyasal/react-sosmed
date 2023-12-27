/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../utils/config";
import { useSelector } from "react-redux";

const CardTextArea = ({ getTweets }) => {
  const user = useSelector((state) => state.user);
  const [tweet, setTweet] = useState("");

  console.log(tweet);
  const handleTweet = async () => {
    try {
      await axios.post(baseUrl + `/tweets/createTweet`, {
        tweet: tweet,
        userId: user.id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      getTweets();
    }
  };

  return (
    <Box mt="4" px="4">
      <Flex gap={8} alignItems={"center"}>
        <Avatar bg="teal.500" size="xl" />
        <Textarea onChange={(e) => setTweet(e.target.value)} maxLength={150} />
      </Flex>
      <Text textAlign="end">{tweet.length}/150</Text>
      <Flex justifyContent="end">
        <Button onClick={handleTweet}>Share</Button>
      </Flex>
    </Box>
  );
};

export default CardTextArea;
