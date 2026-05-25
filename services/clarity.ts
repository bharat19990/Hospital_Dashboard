import "server-only";

export interface ClarityServiceConfig {
  projectId: string | undefined;
}

export function getClarityServiceConfig(): ClarityServiceConfig {
  return {
    projectId: process.env.CLARITY_PROJECT_ID,
  };
}
