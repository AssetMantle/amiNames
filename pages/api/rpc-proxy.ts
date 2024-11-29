import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rpcUrl = "https://rpc.assetmantle.one/"; // Static RPC URL

  try {
    const response = await fetch(rpcUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined, // Remove the `host` header if it exists
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined, // Only include body for non-GET requests
    });

    if (!response.body) {
      res
        .status(response.status)
        .json({ error: "No response body received from RPC server." });
      return;
    }

    // Forward response headers
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Forward the response status
    res.status(response.status);

    // Stream the response body to the client
    const reader = response.body.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });
    return new Response(stream).body.pipeTo(
      new WritableStream({
        write(chunk) {
          res.write(chunk);
        },
        close() {
          res.end();
        },
      })
    );
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to connect to the RPC endpoint." });
  }
}
