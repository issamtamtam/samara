export const DEMO_USER = {
  id: "demo-user",
  name: "Demo Customer",
  email: "demo@customer-service.local",
  type: "guest" as const,
};

export const demoSession = {
  user: DEMO_USER,
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export async function getDemoSession() {
  return demoSession;
}
