import core from "@/api/core/core";

interface RegisterPayload {
  username: string;
  email: string;
  phone_number: string;
  password: string;
}

export async function registerUser(payload: RegisterPayload) {
  const res = await core.post("/auth/register", payload);
  return res.data;
}
