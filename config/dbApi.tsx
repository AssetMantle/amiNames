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
  const data = await response.json();

  if (!response.ok) {
    // Access the `error` property from the API response
    throw new Error(data.error || `Error: ${response.status}`);
  }

  return data;
}

export async function fetchSetProfile(profileName: string, socialsObject: any) {
  // Replace the path with your deployment's base URL in production
  const response = await fetch(`/api/setprofile/${profileName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(socialsObject),
  });

  const data = await response.json();
  if (!response.ok) {
    // Access the `error` property from the API response
    throw new Error(data.error || `Error: ${response.status}`);
  }

  return data;
}
