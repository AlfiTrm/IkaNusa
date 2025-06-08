import core from "@/api/core/core";

interface LoginPayload {
  email: string;
  password: string;
}

export async function loginUser(payload: LoginPayload) {
  const res = await core.post("/auth/login", payload);
  return res.data;
}
