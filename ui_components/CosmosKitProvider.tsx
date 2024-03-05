"use client";
import { chain as curChain, restApi, rpc } from "@/constant";
import asset from "@/constant/asset";
import chain from "@/constant/chain";
import Button from "@/ui_components/Button";
import Modal from "@/ui_components/Modal";
import { icons } from "@/utils/images";
import { SignerOptions } from "@cosmos-kit/core";
import { wallets as cosmostation } from "@cosmos-kit/cosmostation-extension";
import { wallets as frontier } from "@cosmos-kit/frontier";
import { wallets as keplr } from "@cosmos-kit/keplr-extension";
import { wallets as leap } from "@cosmos-kit/leap-extension";
import { wallets as metamask } from "@cosmos-kit/leap-metamask-cosmos-snap";
import { ChainProvider, useChain } from "@cosmos-kit/react";
import { wallets as vectis } from "@cosmos-kit/vectis";
import { assets, chains } from "chain-registry";
import Image from "next/image";
import { getSigningCosmosClientOptions } from "osmojs";
import React from "react";

export default function CosmosKitProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const signerOptions: SignerOptions = {
    //@ts-ignore
    signingStargate: (_chain: Chain) => {
      return getSigningCosmosClientOptions();
    },
  };
  const walletsArray: any = [
    ...keplr,
    ...leap,
    ...metamask,
    ...frontier,
    ...cosmostation,
    ...vectis,
  ];
  const WalletsModal = ({ isOpen, setOpen, walletRepo }: any) => {
    const chainContext = useChain(curChain);
    const { closeView } = chainContext;
    const handleClose = () => {
      setOpen(false);
    };
    console.log("walletRepo: ", walletRepo);
    return (
      <Modal
        openModal={isOpen}
        setOpenModal={setOpen}
        header={
          <h2 className="text-xl font-semibold mb-6 text-primary font-inter">
            Select your wallet
          </h2>
        }
        closeModal={() => {
          handleClose();
        }}
      >
        <Image
          className="object-contain absolute h-8 w-8 top-2 right-2 cursor-pointer"
          alt="selected"
          src={icons.close}
          onClick={() => setOpen(false)}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 items-center justify-center font-inter">
          {walletRepo?.wallets?.map(
            ({ walletName, connect, walletInfo }: any) => {
              return (
                <div key={walletName} className="col-span-1">
                  <Button
                    className="h-[70px] w-full border text-primary border-primary flex items-center gap-2 p-4 relative rounded-lg ease-in-out duration-300 hover:bg-grey hover:text-primaryBlack"
                    onClick={() => {
                      connect();
                      closeView();
                    }}
                  >
                    <div className="w-[40px] h-[40px] relative block">
                      <Image
                        fill={true}
                        className="object-contain relative"
                        alt="selected"
                        src={
                          walletName == "leap-metamask-cosmos-snap"
                            ? walletInfo?.logo?.major
                            : walletInfo.logo
                        }
                      />
                    </div>
                    <p className="text-sm font-semibold">
                      {walletName == "leap-metamask-cosmos-snap"
                        ? "Metamask"
                        : walletInfo.prettyName}
                    </p>
                  </Button>
                </div>
              );
            }
          )}
        </div>
      </Modal>
    );
  };

  return (
    <ChainProvider
      //@ts-ignore
      chains={[...chains, ...[chain]]}
      //@ts-ignore
      assetLists={[...assets, ...[asset]]}
      wallets={walletsArray}
      signerOptions={signerOptions}
      walletModal={WalletsModal}
      endpointOptions={{
        endpoints: {
          assetmantle: {
            rpc: [rpc],
            rest: [restApi],
          },
        },
      }}
    >
      {children}
    </ChainProvider>
  );
}
