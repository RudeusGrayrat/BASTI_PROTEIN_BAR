export type DocumentType = "DNI" | "CE" | "PASSPORT";

export type UserStatus = "ACTIVE" | "INVITED" | "SUSPENDED" | "DISABLED";

export type AuthUser = {
  id: string;
  email: string | null;
  documentType: DocumentType | null;
  documentNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  status: UserStatus;
  emailVerifiedAt: string | null;
  documentVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type LoginInput = {
  identifier: string;
  password: string;
};

export type UpdateCurrentUserInput = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  documentType?: DocumentType | "";
  documentNumber?: string;
};
