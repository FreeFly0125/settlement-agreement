export enum UserRole {
  Proposer = "Proposer",
  Verifier = "Verifier",
}

export enum SettlementStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface RegisterPayload {
  name: string;
  role: UserRole;
}

export interface LoginPayload {
  name: string;
}

export interface Settlement {
  id: number;
  title: string;
  price: string;
  proposer: string;
  verifier: string;
  status: SettlementStatus;
}

export interface SettlementPayload {
  title: string;
  price: string;
  proposer: string;
  verifier: string;
  status: SettlementStatus;
}

export interface UserProfile {
  id: number;
  name: string;
  role: UserRole;
}
