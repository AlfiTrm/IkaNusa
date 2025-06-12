import { UserData } from "../types/userData";

export const getDisplayName = (userData: UserData): string => {
  if (!userData) return "User";
  
  if (userData.name && userData.name.trim()) {
    return userData.name.trim();
  }
  
  if (userData.Username && userData.Username.trim()) {
    return userData.Username.trim();
  }
  
  if (userData.email && userData.email.trim()) {
    return userData.email.split('@')[0];
  }
  
  if (userData.UserID) {
    return `User ${userData.UserID.slice(-4)}`;
  }
  
  return "User";
};

export const getUserInitials = (userData: UserData): string => {
  const displayName = getDisplayName(userData);
  const words = displayName.split(' ');
  
  if (words.length >= 2) {
    return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
  }
  
  return displayName.charAt(0).toUpperCase();
};

export const getSecondaryInfo = (userData: UserData): string => {
  if (!userData) return "";
  
  if (userData.email && userData.email.trim()) {
    return userData.email;
  }
  
  if (userData.UserID) {
    return `ID: ${userData.UserID.slice(-8)}`;
  }
  
  return "";
};