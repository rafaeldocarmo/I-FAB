import { client } from "@/sanity/client";

/**
 * Sanity client with write access, for server-side use only.
 *
 * Never import this from a client component: `SANITY_API_WRITE_TOKEN` grants
 * write access to the dataset and must not reach the browser bundle. It is
 * read lazily so the token is looked up per request rather than captured at
 * module load.
 *
 * Returns `null` when the token is not configured, which lets callers degrade
 * gracefully instead of failing the request.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  return client.withConfig({ token, useCdn: false });
}
