"use server";

import { storeUserSocials } from "@/config/dbApi";
import { revalidatePath } from "next/cache";

export async function addSocialData(updatedSocials: any, profile: any) {
  console.log(
    "inside server action addSocialData, updatedSocials: ",
    updatedSocials,
    " prof: ",
    profile
  );
  // await kv.json.set(`user:${profile}:socials`, "$", updatedSocials);
  await storeUserSocials(updatedSocials, profile);
  revalidatePath(`/profile/${profile}`);
}
