"use client";
import { aminoTypes, registry } from "@/config/defaults";
import { ChainProvider } from "@cosmos-kit/react";
import "@interchain-ui/react/styles";
import { assets, chains } from "chain-registry";
import { SignerOptions, wallets } from "cosmos-kit";

export default function CosmosKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const signerOptions: SignerOptions = {
    // @ts-ignore
    signingStargate: () => {
      return {
        aminoTypes,
        registry,
      };
    },
  };

  return (
    <ChainProvider
      // @ts-ignore
      chains={chains}
      // @ts-ignore
      assetLists={assets}
      wallets={wallets}
      walletConnectOptions={{
        signClient: {
          projectId: "a8510432ebb71e6948cfd6cde54b70f7",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "AMI Names dApp",
            description: "AMI Names dApp built by AssetMantle",
            url: "https://docs.cosmology.zone/cosmos-kit/",
            icons: [],
          },
        },
      }}
      signerOptions={signerOptions}
    >
      {children}
    </ChainProvider>
  );
}
