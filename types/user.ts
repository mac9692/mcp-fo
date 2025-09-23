export interface UserInfo {
  userId: string;
  userNm: string;
  userEmail: string;
  userPhone: string;
  userBirthDt: string;
  userFirstLoginDtm: string | null;
}

export interface UserRequest {
  userId: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}