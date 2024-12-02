import { kv } from "@vercel/kv";

export const storeUserSocials = async (socialsObject: any, profile: string) => {
  try {
    await kv.json.set(`user:${profile}:socials`, "$", socialsObject);
  } catch (error) {
    console.error("Error during saving social links: ", error);
  }
};

export const readUserSocials = async (profile: string) => {
  console.log("env var: ", process.env.NEXT_PUBLIC_KV_REST_API_URL);
  let socialData = {};
  try {
    console.log("profile: ", profile);
    socialData = (await kv.json.get(`user:${profile}:socials`)) || {};
    console.log("socialData: ", socialData);
  } catch (error) {
    console.error("Error during reading social links: ", error);
  }
  return socialData;
};

export async function fetchProfileSocials(profileName: string) {
  // Replace the path with your deployment's base URL in production
  const response = await fetch(`/api/getprofile/${profileName}`);

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
