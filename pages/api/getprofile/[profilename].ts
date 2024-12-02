import { createClient } from "@vercel/kv";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { profilename } = req.query;

  // Validate the dynamic parameter
  if (!profilename || typeof profilename !== "string") {
    return res.status(400).json({ error: "Invalid profile name provided." });
  }

  try {
    // Create a client for the "users" KV namespace
    const users = createClient({
      url: process.env.KV_REST_API_URL, // Replace with USERS KV API URL
      token: process.env.KV_REST_API_TOKEN, // Replace with USERS KV API token
    });

    const socialData =
      (await users.json.get(`user:${profilename}:socials`)) || {};

    // Return the data
    return res.status(200).json({ profile: profilename, socials: socialData });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
