declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API: string;
      // Add other environment variables here as needed
    }
  }
}

// Ensure this file is treated as a module
export {};