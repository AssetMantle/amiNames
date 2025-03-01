const asset = {
  $schema: "./assetlist.schema.json",
  chain_name: "assetmantle",
  assets: [
    {
      description: "The native token of Asset Mantle",
      denom_units: [
        {
          denom: "umntl",
          exponent: 0,
        },
        {
          denom: "umntl",
          exponent: 6,
        },
      ],
      base: "umntl",
      name: "AssetMantle",
      display: "umntl",
      symbol: "MNTL",
      logo_URIs: {
        png: "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.png",
        svg: "https://raw.githubusercontent.com/cosmos/chain-registry/master/assetmantle/images/mntl.svg",
      },
      coingecko_id: "assetmantle",
    },
  ],
};

export default asset;
