/// <reference types="gtag.js" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_GITHUB_URL: string;
      NEXT_PUBLIC_SUPPORT_URL: string;
      NEXT_PUBLIC_BOT_INVITE_URL: string;
      NEXT_PUBLIC_GA_ID: string;
      NEXT_PUBLIC_STATUSPAGE_URL: string;
      PRIVATE_API_URL: string;
      PRIVATE_API_TOKEN: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
