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

  // Ensure it's a POST request
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: `Method ${req.method} not allowed. Use POST.` });
  }

  try {
    // Create a client for the "users" KV namespace
    const users = createClient({
      url: process.env.KV_REST_API_URL, // Replace with USERS KV API URL
      token: process.env.KV_REST_API_TOKEN, // Replace with USERS KV API token
    });

    // Extract the socialsObject from the request body
    const socialsObject = req.body;

    if (!socialsObject || typeof socialsObject !== "object") {
      return res.status(400).json({ error: "Invalid data in request body." });
    }

    // Save the socialsObject to KV store
    await users.json.set(`user:${profilename}:socials`, "$", socialsObject);

    // Respond with success
    return res
      .status(200)
      .json({ message: "Profile updated successfully", profile: profilename });
  } catch (error) {
    console.error("Error setting profile data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
