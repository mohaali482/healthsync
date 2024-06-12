declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;

      SUPER_USER_USERNAME: string;
      SUPER_USER_EMAIL: string;
      SUPER_USER_FIRST_NAME: string;
      SUPER_USER_LAST_NAME: string;
      SUPER_USER_PASSWORD: string;
      HASH_ROUNDS: string;
      PREDICTION_URL: string;

      RESEND_API_KEY: string;
      HOME_URL: string;
    }
  }
}

export {};
