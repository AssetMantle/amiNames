import {
  assetmantleAminoConverters,
  assetmantleProtoRegistry,
} from "@assetmantle/mantlejs";
import { Asset, AssetList } from "@chain-registry/types";
import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { AminoTypes } from "@cosmjs/stargate";
import { assets } from "chain-registry";
import {
  cosmosAminoConverters,
  cosmosProtoRegistry,
  cosmwasmAminoConverters,
  cosmwasmProtoRegistry,
  ibcAminoConverters,
  ibcProtoRegistry,
} from "interchain-query";
import { useRouter } from "next/router";

export const defaultChainName = "assetmantle";
export const defaultReferrer = "assetmantle";

export const chainassets = assets.find(
  (chain) => chain.chain_name === defaultChainName
) as AssetList;

export const coin = chainassets.assets.find(
  (asset) => asset.base === "uosmo"
) as Asset;

const protoRegistry: ReadonlyArray<[string, GeneratedType]> = [
  ...cosmosProtoRegistry,
  ...cosmwasmProtoRegistry,
  ...ibcProtoRegistry,
  ...assetmantleProtoRegistry,
];

const aminoConverters = {
  ...cosmosAminoConverters,
  ...cosmwasmAminoConverters,
  ...ibcAminoConverters,
  ...assetmantleAminoConverters,
};

export const registry = new Registry(protoRegistry);
export const aminoTypes = new AminoTypes(aminoConverters);

export function useReferralRouter() {
  const router = useRouter();
  const referral =
    typeof window !== "undefined" ? localStorage.getItem("referral") : null;

  const pushWithReferral = (url: string, as?: string, options = {}) => {
    if (!referral) return router.push(url, as || url, options);

    const [path, queryString] = url.split("?");
    const searchParams = new URLSearchParams(queryString || "");
    searchParams.set("referral", referral);

    const newUrl = `${path}?${searchParams.toString()}`;
    return router.push(newUrl, as || newUrl, options);
  };

  return { ...router, pushWithReferral };
}
