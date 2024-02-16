import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
import ListingGrid from "../components/ListingGrid";
import { MARKETPLACE_ADDRESS } from "../constants/addresses";
import { useContract, useValidDirectListings } from "@thirdweb-dev/react";

export default function Buy() {
  const { contract: marketplace, isLoading: loadingMarketplace } = 
  useContract(
      MARKETPLACE_ADDRESS, 
      "marketplace-v3"
  );

  // Only direct listing for the moment (add the English auction soon)
  const { data: directListings, isLoading: loadingDirectListings } = 
  useValidDirectListings(marketplace);

  console.log("direct listing:", directListings);

  return (
    <Container maxW={"1200px"} p={5}>
      <Heading>Buy NFTs</Heading>
      <Text>Browse and buy NFTs listed.</Text>
      <ListingGrid 
        isLoading={loadingDirectListings} 
        data={directListings} 
        emptyText={"No NFTs for sale"}
      />
    </Container>
  )
};