import core from "@/api/core/core";
import { decodeToken } from "@/utils/token"; 

export interface OTPVerificationRequest {
    user_id: string;
    otp_code: string;
}

export interface ResendOTPRequest {
    user_id: string;
}

export const verifyOTP = async (payload: OTPVerificationRequest) => {
    try {
        const response = await core.patch("/auth/register", payload);
        alert("OTP berhasil diverifikasi!");
        return response.data;
    } catch (error: unknown) {
        alert("Kode OTP tidak valid atau sudah kadaluarsa");
        throw error;
    }
};

export const resendOTP = async (payload: ResendOTPRequest) => {
    try {
        const response = await core.post("/auth/resend-otp", payload);
        alert("Kode OTP baru telah dikirim ke email Anda");
        return response.data;
    } catch (error: unknown) {
        alert("Gagal mengirim ulang OTP");
        throw error;
    }
};

/**
 * Get user ID from token using existing decodeToken function
 */
export const getUserIdFromToken = (): string | null => {
    const decoded = decodeToken();
    return decoded?.UserID || null;
};