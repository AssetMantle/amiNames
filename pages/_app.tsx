import "@interchain-ui/react/styles";
import "react-toastify/dist/ReactToastify.css";
import "../styles/index.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Loading from "@/components/Loading";
import { ChainProvider } from "@cosmos-kit/react";
import {
  Box,
  ThemeProvider,
  useColorModeValue,
  useTheme,
} from "@interchain-ui/react";
import { assets, chains } from "chain-registry";
import { SignerOptions, wallets } from "cosmos-kit";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { aminoTypes, registry } from "../config/defaults";
import PromptInstall from "@/components/PromptInstall";

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
  const router = useRouter();

  const subWallets = wallets.not("coin98", "compass");

  // State to manage loading screen
  const [isLoading, setIsLoading] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  const signerOptions: SignerOptions = {
    // @ts-ignore
    signingStargate: () => {
      return {
        aminoTypes,
        registry,
      };
    },
  };

  useEffect(() => {
    const { referral } = router.query;
    if (referral) {
      // Save referral code to localStorage
      localStorage.setItem("referral", referral as string);
    }
  }, [router.query]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsLoading(true); // Show loading screen
    };

    const handleRouteChangeComplete = (url: string) => {
      setIsLoading(false); // Hide loading screen

      // Append referral code to URL if missing
      const referral = localStorage.getItem("referral");
      if (referral) {
        const [path, queryString] = url.split("?");
        const searchParams = new URLSearchParams(queryString || "");
        if (!searchParams.has("referral")) {
          searchParams.set("referral", referral);
          router.replace(`${path}?${searchParams.toString()}`, undefined, {
            shallow: true,
          });
        }
      }
    };

    const handleRouteChangeError = () => {
      setIsLoading(false); // Hide loading screen on error
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  // Checking if Install Prompt should be opened (only on load)
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt as any;
      promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("PWA installation accepted");
      } else {
        console.log("PWA installation dismissed");
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    }
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
          wallets={subWallets}
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
            <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Box
              className={themeClass}
              minHeight="100dvh"
              backgroundColor={useColorModeValue("#ffffff", "#ffffff")}
            >
              <Component {...pageProps} />
              <PromptInstall
                fun={handleInstall}
                open={isInstallable}
                close={() => setIsInstallable(false)}
              />
              {isLoading && <Loading />}
            </Box>
          </QueryClientProvider>
        </ChainProvider>
      </ThemeProvider>
    </>
  );
}

export default CreateCosmosApp;
