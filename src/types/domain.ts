export type UserRole = "USER" | "ADMIN" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";
export type ReportType = "LOST" | "FOUND";
export type ReportStatus = "PENDING_REVIEW" | "ACTIVE" | "MATCHED" | "CLAIMED" | "RESOLVED" | "REJECTED" | "CLOSED";
export type ClaimStatus = "PENDING" | "NEEDS_MORE_INFO" | "APPROVED" | "REJECTED" | "CANCELLED" | "RESOLVED";
export type MatchStatus = "SUGGESTED" | "SAVED" | "REJECTED" | "CONFIRMED" | "EXPIRED";
export type NotificationType = "MATCH_FOUND" | "CLAIM_SUBMITTED" | "CLAIM_APPROVED" | "CLAIM_REJECTED" | "REPORT_RESOLVED" | "SYSTEM" | "SAFETY";

export type AdminUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  reportsCount: number;
  claimsCount: number;
  joinedAt: string;
};

export type Report = {
  id: string;
  ownerId: string;
  ownerName: string;
  type: ReportType;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  status: ReportStatus;
  imageUrl?: string;
  riskScore: number;
  createdAt: string;
};

export type Claim = {
  id: string;
  reportId: string;
  reportTitle: string;
  claimantId: string;
  claimantName: string;
  ownerName: string;
  proofDescription: string;
  contact: string;
  status: ClaimStatus;
  createdAt: string;
};

export type Match = {
  id: string;
  lostReportId: string;
  foundReportId: string;
  lostTitle: string;
  foundTitle: string;
  score: number;
  status: MatchStatus;
  evidence: string[];
  createdAt: string;
};

export type Notification = {
  id: string;
  userName: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type AuditLog = {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  ipAddress: string;
  createdAt: string;
};
