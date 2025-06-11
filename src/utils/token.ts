import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  UserID: string;
  Username: string
  exp: string;
}

export const decodeToken = (): DecodedToken | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded;
  } catch (error) {
    console.error("Gagal mendekode token:", error);
    return null;
  }
};
