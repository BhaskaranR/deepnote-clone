import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  shared: {
    VERCEL_URL: z
      .string()
      .optional()
      .transform((v) => (v ? `https://${v}` : undefined)),
    PORT: z.coerce.number().default(3000),
  },
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    PLAIN_API_KEY: z.string(),
    SUPABASE_SERVICE_KEY: z.string(),
    UPSTASH_REDIS_REST_TOKEN: z.string(),
    UPSTASH_REDIS_REST_URL: z.string(),
    NOVU_API_KEY: z.string(),
    NOVU_SECRET_KEY: z.string(),
    RESEND_API_KEY: z.string(),
    OPENPANEL_SECRET_KEY: z.string(),
    RESEND_AUDIENCE_ID: z.string(),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER: z.string(),
    NEXT_PUBLIC_SUPABASE_ID: z.string(),
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID: z.string(),
    NEXT_PUBLIC_APP_DOMAIN: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_ID: process.env.NEXT_PUBLIC_SUPABASE_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PORT: process.env.PORT,
    NOVU_API_KEY: process.env.NOVU_API_KEY,
    NOVU_SECRET_KEY: process.env.NOVU_SECRET_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER:
      process.env.NEXT_PUBLIC_NOVU_APPLICATION_IDENTIFIER,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    PLAIN_API_KEY: process.env.PLAIN_API_KEY,
    NEXT_PUBLIC_OPENPANEL_CLIENT_ID:
      process.env.NEXT_PUBLIC_OPENPANEL_CLIENT_ID,
    OPENPANEL_SECRET_KEY: process.env.OPENPANEL_SECRET_KEY,
    RESEND_AUDIENCE_ID: process.env.RESEND_AUDIENCE_ID,
    NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
