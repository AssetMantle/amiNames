import { fromHex, toHex, toUtf8 } from "@cosmjs/encoding";
import base64url from "base64url";
import { sha256 as jsSha256 } from "js-sha256";

const toBase64Url = (uint8Array: any) => base64url(uint8Array) + "=";
const generateHashID = (...args: any) => {
  const hexArrayList: any = [];
  args.forEach((arg: any) => {
    if (arg?.length > 0) hexArrayList.push(toHex(arg));
  });
  if (hexArrayList.length == 0) return hexArrayList;
  const sortedHexArrayList = hexArrayList.sort();
  const sortedUint8ArrayList = sortedHexArrayList.map((hexArray: any) => fromHex(hexArray));
  const joinedUint8Array = sortedUint8ArrayList.reduce(
    (finalArray: any, valueArray: any) => [...finalArray, ...valueArray],
    []
  );
  const hexOfJoinedArray = jsSha256(joinedUint8Array);
  return fromHex(hexOfJoinedArray);
};

export const getNubIdentityID = (nubID: any) => {
  const classificationIDUint8Array = base64url.toBuffer("Tw96hXEJjSw/aQ9rNh0c/72wQUL5gzEdODohcVY4l6I=");
  const nubIDHashUintArray = generateHashID(generateHashID(toUtf8(nubID)));
  const nubIdentityID = generateHashID(nubIDHashUintArray, classificationIDUint8Array);
  return toBase64Url(nubIdentityID);
};
