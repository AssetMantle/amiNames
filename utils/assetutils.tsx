import {
  instagramHandleRegEx,
  instagramUrlRegEx,
  premiumAddress,
  rpc,
  telegramHandleRegEx,
  telegramUrlRegEx,
  twitterHandleRegEx,
  twitterUrlRegEx,
  websiteUrlRegEx,
} from "@/constant";
import { assetmantle } from "@assetmantle/mantlejs";
import { fromHex, toHex, toUtf8 } from "@cosmjs/encoding";
import base64url from "base64url";
import { bech32 } from "bech32";
import { sha256 as jsSha256 } from "js-sha256";
import { toast } from "react-toastify";

const toBase64Url = (uint8Array: any) => base64url(uint8Array) + "=";

const generateHashID = (...args: any) => {
  const hexArrayList: any = [];
  args.forEach((arg: any) => {
    if (arg?.length > 0) hexArrayList.push(toHex(arg));
  });
  if (hexArrayList.length == 0) return hexArrayList;
  const sortedHexArrayList = hexArrayList.sort();
  const sortedUint8ArrayList = sortedHexArrayList.map((hexArray: any) =>
    fromHex(hexArray)
  );
  const joinedUint8Array = sortedUint8ArrayList.reduce(
    (finalArray: any, valueArray: any) => [...finalArray, ...valueArray],
    []
  );
  const hexOfJoinedArray = jsSha256(joinedUint8Array);
  return fromHex(hexOfJoinedArray);
};

export const getNubIdentityID = (nubID: any) => {
  const classificationIDUint8Array = base64url.toBuffer(
    "Tw96hXEJjSw/aQ9rNh0c/72wQUL5gzEdODohcVY4l6I="
  );
  const nubIDHashUintArray = generateHashID(generateHashID(toUtf8(nubID)));
  const nubIdentityID = generateHashID(
    nubIDHashUintArray,
    classificationIDUint8Array
  );
  return toBase64Url(nubIdentityID);
};

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
  toast[type](message);
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

export const addProtocol = (url: string): any => {
  return url.startsWith("www") ? `https://${url}` : url;
};

const validateTwitter = (twitterString: string): any => {
  if (!twitterString) return { isValid: true, url: "" };
  const cleanTwitterArray = twitterString
    ?.toString?.()
    ?.trim?.()
    ?.split(" ", 2);
  const cleanTwitterString = cleanTwitterArray?.[0];
  // check if already a valid website url
  const twitterWebsiteBoolean = twitterUrlRegEx.test(cleanTwitterString);
  if (twitterWebsiteBoolean)
    return { isValid: true, url: addProtocol(cleanTwitterString) };
  const twitterHandleBoolean = twitterHandleRegEx.test(cleanTwitterString);
  const returnObject = twitterHandleBoolean
    ? {
        isValid: true,
        url: `https://twitter.com/${cleanTwitterString.replace(/^@/, "")}`,
      }
    : { isValid: false };
  return returnObject;
};

const validateTelegram = (telegramString: string): any => {
  if (!telegramString) return { isValid: true, url: "" };
  const cleanTelegramArray = telegramString
    ?.toString?.()
    ?.trim?.()
    ?.split(" ", 2);
  const cleanTelegramString = cleanTelegramArray?.[0];
  // check if already a valid website url
  const telegramWebsiteBoolean = telegramUrlRegEx.test(cleanTelegramString);
  if (telegramWebsiteBoolean)
    return { isValid: true, url: addProtocol(cleanTelegramString) };
  const telegramHandleBoolean = telegramHandleRegEx.test(cleanTelegramString);
  const returnObject = telegramHandleBoolean
    ? {
        isValid: true,
        url: `https://t.me/${cleanTelegramString.replace(/^@/, "")}`,
      }
    : { isValid: false };
  return returnObject;
};

const validateInstagram = (instagramString: string): any => {
  if (!instagramString) return { isValid: true, url: "" };
  const cleanInstagramArray = instagramString
    ?.toString?.()
    ?.trim?.()
    ?.split(" ", 2);
  const cleanInstagramString = cleanInstagramArray?.[0];
  // check if already a valid website url
  const instagramWebsiteBoolean = instagramUrlRegEx.test(cleanInstagramString);
  if (instagramWebsiteBoolean)
    return { isValid: true, url: addProtocol(cleanInstagramString) };
  const instagramHandleBoolean =
    instagramHandleRegEx.test(cleanInstagramString);
  console.log(
    "cleanInstagramString: ",
    cleanInstagramString,
    " instagramWebsiteBoolean: ",
    instagramWebsiteBoolean,
    " instagramHandleBoolean: ",
    instagramHandleBoolean
  );
  const returnObject = instagramHandleBoolean
    ? {
        isValid: true,
        url: `https://www.instagram.com/${cleanInstagramString.replace(
          /^@/,
          ""
        )}`,
      }
    : { isValid: false };
  return returnObject;
};

const validateWebsite = (websiteString: string): any => {
  if (!websiteString) return { isValid: true, url: "" };
  const cleanWebsiteArray = websiteString
    ?.toString?.()
    ?.trim?.()
    ?.split(" ", 2);
  const cleanWebsiteString = cleanWebsiteArray?.[0];
  // check if already a valid website url
  const websiteUrlBoolean = websiteUrlRegEx.test(cleanWebsiteString);
  if (websiteUrlBoolean) {
    return { isValid: true, url: addProtocol(cleanWebsiteString) };
  } else {
    return { isValid: false };
  }
};

export const validateSocials = (socialsObject: any) => {
  let result = {};
  let validatedSocials = {};
  let validationErrors = [];
  // validate twitter
  const twitterObj = validateTwitter(socialsObject?.twitter?.toString?.());
  if (twitterObj?.isValid) {
    validatedSocials = { ...validatedSocials, twitter: twitterObj?.url };
  } else {
    validationErrors?.push?.("twitter");
  }

  // validate telegram
  const telegramObj = validateTelegram(socialsObject?.telegram?.toString?.());
  if (telegramObj?.isValid) {
    validatedSocials = { ...validatedSocials, telegram: telegramObj?.url };
  } else {
    validationErrors?.push?.("telegram");
  }

  // validate instagram
  const instagramObj = validateInstagram(
    socialsObject?.instagram?.toString?.()
  );
  if (instagramObj?.isValid) {
    validatedSocials = { ...validatedSocials, instagram: instagramObj?.url };
  } else {
    validationErrors?.push?.("instagram");
  }

  // validate website
  const websiteObj = validateWebsite(socialsObject?.website?.toString?.());
  if (websiteObj?.isValid) {
    validatedSocials = { ...validatedSocials, website: websiteObj?.url };
  } else {
    validationErrors?.push?.("website");
  }

  // return value
  return {
    ...result,
    validatedSocials,
    error: validationErrors,
  };
};

export const updateMyAmiList = (username: string, walletAddress: string) => {
  // Retrieve and parse the existing list from localStorage
  const existList = getFromLocalStorage("amiNamesList");
  const nameList = existList?.map?.((item: any) => item.name);

  // Check for duplicates before adding
  if (!nameList.includes(username)) {
    existList?.push?.({ address: walletAddress, name: username });
    saveToLocalStorage("amiNamesList", existList);
    window.dispatchEvent(new Event("storage"));
  }
};
