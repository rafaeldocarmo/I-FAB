import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ke5xx09s",
  dataset: "production",
  apiVersion: "2025-06-01",
  useCdn: false,
});