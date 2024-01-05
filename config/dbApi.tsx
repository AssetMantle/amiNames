import { kv } from "@vercel/kv";

export const storeUserSocials = async (socialsObject: any, profile: string) => {
  try {
    await kv.json.set(`user:${profile}:socials`, "$", socialsObject);
  } catch (error) {
    console.error("Error during saving social links: ", error);
  }
};

export const readUserSocials = async (profile: string) => {
  let socialData = {};
  try {
    socialData = await kv.json.get(`user:${profile}:socials`);
  } catch (error) {
    console.error("Error during reading social links: ", error);
  }
  return socialData;
};
