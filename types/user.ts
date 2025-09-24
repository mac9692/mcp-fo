export interface UserInfo {
  userLoginId: string;
  userNm: string;
  userEmail: string;
  userPhone: string;
  userBirthDt: string;
  userFirstLoginDtm: string | null;
  pointBalance: number;
  coinBalance: number;
}

export interface UserRequest {
  userId: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}