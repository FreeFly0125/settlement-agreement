export enum UserRole {
  Proposer = "Proposer",
  Verifier = "Verifier",
}

export enum SettlementStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface UserProfile {
  name: string;
  role: UserRole;
}

export interface Settlement {
  title: string;
  description: string;
  proposer: string;
  verifier: string;
  status: SettlementStatus;
  last_update: Date;
}

export interface VerifyPayload {
  verifier: string;
  status: SettlementStatus;
}
