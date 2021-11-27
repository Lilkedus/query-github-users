import Head from "next/head";
import Axios from "axios";
import { Box, Center, Heading, Input, Image, Flex, Spacer } from "@chakra-ui/react";
import { useState } from "react";

import styles from "../styles/Home.module.css";

export default function Home() {
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState([]);
  const api = `https://api.github.com/search/users?q=location%3A${location}`;

  const handleSubmit = e => {
    e.preventDefault();

    const res = Axios.get(api);
    res.then(({ data }) => setUsers(data.items)).catch(err => console.log(err));
  }

  return (
    <div>
      <Head>
        <title>Github users in a specified region</title>
      </Head>
      <Box>
        <Center>
          <form onSubmit={handleSubmit}>
            <Heading my="4">Search for a location 🗺 </Heading>
            <Input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Type a location..."
            />
          </form>
        </Center>
      </Box>
      <div>
        {users.length == 0 && (
          <Center my="10">
            <Heading size="2xs" color="gray.500">No users found with that location</Heading>
          </Center>
        )}
        {users.map(({ login, avatar_url }) => (
          <Box key={login}>
            <Center>
              <span>
                <Flex w="2xs" p="3" border="1px" borderColor="blackAlpha.200" rounded="md" m="3" justifyContent="space-evenly" alignItems="center">
                  <Image
                    src={avatar_url}
                    alt="profile-image"
                    className={styles.image}
                    w="100px"
                    mr="10"
                  />
                  <h1>Username: {login}</h1>
                </Flex>
              </span>
            </Center>
          </Box>
        ))}
      </div>
    </div>
  );
}
