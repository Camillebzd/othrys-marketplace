import NextLink from 'next/link'
import type { NextPage } from "next";
import { Button, Container, Flex, Heading, Stack } from '@chakra-ui/react';

import { useContract, useNFT, useValidDirectListings } from '@thirdweb-dev/react';
import { MARKETPLACE_ADDRESS } from '../constants/addresses';

const Home: NextPage = () => {
  const { contract: nftCollection } = useContract("0xF7C7aA8bfb97c3089356aFe4f28ccf869c20cDb6");
  const { data: nft, isLoading: isNFTLoading } = useNFT(nftCollection, 0);
  console.log("contract:", nftCollection);
  console.log("NFT:", nft);
  return (
    <Container maxW={"1200px"}>
      <Flex h={"80vh"} alignItems={"center"} justifyContent={"center"}>
        <Stack spacing={4} align={"center"}>
          <Heading>Othrys</Heading>
          <Button
             as={NextLink} href='/buy'
          >Shop NFTs</Button>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Home;
