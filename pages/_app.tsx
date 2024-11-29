import "@interchain-ui/react/styles";
import "../styles/index.scss";

import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ChainProvider } from "@cosmos-kit/react";
import { assets, chains } from "chain-registry";
import { SignerOptions, wallets } from "cosmos-kit";
import { aminoTypes, registry } from "../config/defaults";

import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from "@interchain-ui/react";
import Head from "next/head";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function CreateCosmosApp({ Component, pageProps }: AppProps) {
  const { themeClass } = useTheme();

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
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>AMI Names</title>
        <meta name="description" content="Claim your AMI Names" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Icons from manifest */}
        <link
          rel="mask-icon"
          href="/icons/web-app-manifest-192x192.png"
          color="#000000"
        />
        <link
          rel="icon"
          href="/icons/web-app-manifest-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/icons/web-app-manifest-384x384.png"
          sizes="384x384"
          type="image/png"
        />
        <link
          rel="icon"
          href="/icons/web-app-manifest-512x512.png"
          sizes="512x512"
          type="image/png"
        />

        {/* Manifest Link */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://yourdomain.com" />
        <meta name="twitter:title" content="AMI Names" />
        <meta name="twitter:description" content="Claim your AMI Names" />
        <meta name="twitter:image" content="/icons/twitter.png" />
        <meta name="twitter:creator" content="@YourTwitterHandle" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AMI Names" />
        <meta property="og:description" content="Claim your AMI Names" />
        <meta property="og:site_name" content="AMI Names" />
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:image" content="/icons/og.png" />
      </Head>
      <ThemeProvider>
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
                name: "Cosmos Kit dApp",
                description: "Cosmos Kit dApp built by Create Cosmos App",
                url: "https://docs.cosmology.zone/cosmos-kit/",
                icons: [],
              },
            },
          }}
          signerOptions={signerOptions}
        >
          <QueryClientProvider client={queryClient}>
            <Box
              className={themeClass}
              minHeight="100dvh"
              backgroundColor={useColorModeValue("#ffffff", "#ffffff")}
            >
              {/* TODO fix type error */}
              {/* @ts-ignore */}
              <Component {...pageProps} />
            </Box>
          </QueryClientProvider>
        </ChainProvider>
      </ThemeProvider>
    </>
  );
}

export default CreateCosmosApp;
