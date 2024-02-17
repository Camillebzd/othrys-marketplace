import React from "react";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import { 
  MARKETPLACE_ADDRESS, 
} from "../constants/addresses";
import { ThirdwebNftMedia, useContract, useValidDirectListings, useValidEnglishAuctions } from "@thirdweb-dev/react";
import { Box, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import { EvmNft } from "moralis/common-evm-utils";
import { NFTMetadata } from "../constants/types";

type Props = {
  nft: EvmNft;
};

export default function NFTComponent({ nft }: Props) {
  const  {contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  // Use custom type because Moralys use MoralisDataObjectValue -> bypass TS
  const metadata: NFTMetadata = nft.metadata as unknown as NFTMetadata;

  const { data: directListing, isLoading: loadingDirectListing } = 
    useValidDirectListings(marketplace, {
      tokenContract: nft.tokenAddress.lowercase,
      tokenId: nft.tokenId,
    });

  const { data: auctionListing, isLoading: loadingAuction} = 
    useValidEnglishAuctions(marketplace, {
      tokenContract: nft.tokenAddress.lowercase,
      tokenId: nft.tokenId,
    });
  

  return (
    <Flex direction={"column"} backgroundColor={"#EEE"} justifyContent={"center"} padding={"2.5"} borderRadius={"6px"} borderColor={"lightgray"} borderWidth={1}>
      <Box borderRadius={"4px"} overflow={"hidden"}>
        {/* <ThirdwebNftMedia metadata={nft} height={"100%"} width={"100%"} /> */}
        <Image 
          src={metadata?.image}
          alt={`NFT image of ${metadata?.name || "Unknow"}`}
        />
        <Text>NFT IMAGE HERE</Text>
      </Box>
      <Text fontSize={"small"} color={"darkgray"}>Token ID #{nft.tokenId}</Text>
      <Text fontWeight={"bold"}>{metadata?.name || "Unknow"}</Text>

      <Box>
        {loadingMarketplace || loadingDirectListing || loadingAuction ? (
          <Skeleton></Skeleton>
        ) : directListing && directListing[0] ? (
          <Box>
            <Flex direction={"column"}>
              <Text fontSize={"small"}>Price</Text>
              <Text fontSize={"small"}>{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Text>
            </Flex>
          </Box>
        ) : auctionListing && auctionListing[0] ? (
          <Box>
            <Flex direction={"column"}>
              <Text fontSize={"small"}>Minimum Bid</Text>
              <Text fontSize={"small"}>{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</Text>
            </Flex>
          </Box>
        ) : (
          <Box>
            <Flex direction={"column"}>
              <Text fontSize={"small"}>Price</Text>
              <Text fontSize={"small"}>Not Listed</Text>
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  )
};