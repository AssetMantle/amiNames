import { assetmantle } from "@assetmantle/mantlejs";
import { bech32 } from "bech32";
import { toast } from "react-toastify";
import { getNubIdentityID } from "./crypto_utils";
import base64url from "base64url";
import { premiumAddress, rpc } from "@/constant";

export const trimAddress = (val: string, charsToKeep: number) => {
  if (val.length <= charsToKeep * 2) {
    return val;
  }
  const firstChars = val.substring(0, charsToKeep);
  const lastChars = val.substring(val.length - charsToKeep, val.length);
  return firstChars + "..." + lastChars;
};

const toastBgColor = {
  success: "#42A153",
  error: "#E11900",
};

export const showToastMessage = (
  type: "success" | "error",
  message: string
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      backgroundColor: toastBgColor[type],
    },
  });
};

export const getBech32AddressFromBytes = (data: ArrayLike<number>) => {
  const words = bech32.toWords(data);
  const address = bech32.encode("mantle", words);
  return address;
};

export const getNubIdentity = async (username: string, rpcEndpoint: string) => {
  try {
    const mantleQueryClient =
      await assetmantle.ClientFactory.createRPCQueryClient({
        rpcEndpoint,
      });
    const hashId = getNubIdentityID(username);
    const hashIdUint8Array = new Uint8Array(base64url.toBuffer(hashId));
    const queryRequest =
      assetmantle.modules.identities.queries.identity.QueryRequest.fromPartial({
        key: { identityID: { hashID: { iDBytes: hashIdUint8Array } } },
      });
    const { record } =
      (await mantleQueryClient.assetmantle.modules.identities.queries.identity.handle(
        queryRequest
      )) as any;

    return record;
  } catch (error) {
    //@ts-ignore
    showToastMessage("error", error?.message);
  }
};

export const isValidReferrer = async (username: string): Promise<any> => {
  const rpcEndpoint = rpc;
  const record = await getNubIdentity(username, rpcEndpoint);
  if (record?.key?.identityID?.hashID?.iDBytes?.length == 0) {
    //user does not exist
    return {
      isValidUserName: false,
      isPremium: false,
      address: "",
    };
  } else if (record?.key?.identityID?.hashID?.iDBytes?.length) {
    const accAddressData =
      record?.mappable?.identity?.mutables?.propertyList?.anyProperties?.[0]
        ?.metaProperty?.data?.listData?.value?.[0].accAddressData?.value;
    if (accAddressData) {
      const address = getBech32AddressFromBytes(accAddressData);
      if (address === premiumAddress) {
        return {
          isValidUserName: false,
          isPremium: true,
          address: address,
        };
      } else {
        return {
          isValidUserName: true,
          isPremium: false,
          address: address,
        };
      }
    }
  } else {
    //user exist
    return {
      isValidUserName: true,
      isPremium: false,
      address: "",
    };
  }
};

// Function to save a list of objects to localStorage
export const saveToLocalStorage = (key: string, list: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// Function to retrieve a list of objects from localStorage
export const getFromLocalStorage = (key: string) => {
  try {
    const storedList = localStorage.getItem(key);
    return storedList ? JSON.parse(storedList) : [];
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return [];
  }
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value?.toString(16)).substr(-2);
  }
  return `hsl(${hash % 360}, ${50}%, ${50}%)`;
};
