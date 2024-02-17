// Used because Metadata on Moralis EVMNft are unusable...
export type NFTAttribute = {
  trait_type: string;
  value: string | number | string[] | number[];
  display_type?: string;
  max_value?: number;
};

export type NFTMetadata = {
  name: string;
  image: string;
  description: string;
  attributes: NFTAttribute[]
};
