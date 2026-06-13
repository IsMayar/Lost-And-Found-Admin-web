import type { AdminUser, AuditLog, Claim, Match, Notification, Report } from "../types/domain";

export const usersSeed: AdminUser[] = [
  { id: "u_1", fullName: "Ismael Mayar", email: "ismael@example.com", role: "SUPER_ADMIN", status: "ACTIVE", reportsCount: 12, claimsCount: 4, joinedAt: "2026-05-01" },
  { id: "u_2", fullName: "Amina Rahimi", email: "amina@example.com", role: "USER", status: "ACTIVE", reportsCount: 5, claimsCount: 2, joinedAt: "2026-05-10" },
  { id: "u_3", fullName: "Karim Ahmadi", email: "karim@example.com", role: "USER", status: "SUSPENDED", reportsCount: 3, claimsCount: 0, joinedAt: "2026-05-14" },
  { id: "u_4", fullName: "Farzana Noor", email: "farzana@example.com", role: "ADMIN", status: "ACTIVE", reportsCount: 1, claimsCount: 1, joinedAt: "2026-05-18" },
];

export const reportsSeed: Report[] = [
  { id: "r_1", ownerId: "u_2", ownerName: "Amina Rahimi", type: "LOST", title: "Black iPhone 14", category: "Phone", description: "Lost near university entrance with a blue case.", location: "Kabul University", date: "2026-06-08", status: "PENDING_REVIEW", riskScore: 12, createdAt: "2026-06-08T09:00:00Z" },
  { id: "r_2", ownerId: "u_3", ownerName: "Karim Ahmadi", type: "FOUND", title: "Brown Leather Wallet", category: "Wallet", description: "Found wallet with cards, no cash details shown publicly.", location: "Shahr-e Naw", date: "2026-06-07", status: "ACTIVE", riskScore: 18, createdAt: "2026-06-07T11:00:00Z" },
  { id: "r_3", ownerId: "u_2", ownerName: "Amina Rahimi", type: "FOUND", title: "Silver Laptop Bag", category: "Bag", description: "Found a laptop bag in a taxi station.", location: "Kart-e Char", date: "2026-06-06", status: "MATCHED", riskScore: 8, createdAt: "2026-06-06T10:30:00Z" },
  { id: "r_4", ownerId: "u_4", ownerName: "Farzana Noor", type: "LOST", title: "Afghan Passport", category: "Document", description: "Lost passport in a black folder.", location: "Kabul Airport", date: "2026-06-05", status: "RESOLVED", riskScore: 4, createdAt: "2026-06-05T15:40:00Z" },
];

export const claimsSeed: Claim[] = [
  { id: "c_1", reportId: "r_2", reportTitle: "Brown Leather Wallet", claimantId: "u_2", claimantName: "Amina Rahimi", ownerName: "Karim Ahmadi", proofDescription: "Can describe hidden card and inner mark.", contact: "amina@example.com", status: "PENDING", createdAt: "2026-06-09T12:00:00Z" },
  { id: "c_2", reportId: "r_3", reportTitle: "Silver Laptop Bag", claimantId: "u_1", claimantName: "Ismael Mayar", ownerName: "Amina Rahimi", proofDescription: "Can describe laptop sticker and charger type.", contact: "ismael@example.com", status: "APPROVED", createdAt: "2026-06-08T08:00:00Z" },
];

export const matchesSeed: Match[] = [
  { id: "m_1", lostReportId: "r_1", foundReportId: "r_3", lostTitle: "Black iPhone 14", foundTitle: "Silver Laptop Bag", score: 42, status: "SUGGESTED", evidence: ["Same area", "Close date range"], createdAt: "2026-06-08T12:00:00Z" },
  { id: "m_2", lostReportId: "r_4", foundReportId: "r_2", lostTitle: "Afghan Passport", foundTitle: "Brown Leather Wallet", score: 28, status: "REJECTED", evidence: ["Different category", "Same city"], createdAt: "2026-06-07T16:00:00Z" },
];

export const notificationsSeed: Notification[] = [
  { id: "n_1", userName: "Amina Rahimi", type: "MATCH_FOUND", title: "Possible match found", message: "A potential match was generated for Black iPhone 14.", isRead: false, createdAt: "2026-06-09T09:30:00Z" },
  { id: "n_2", userName: "Karim Ahmadi", type: "CLAIM_SUBMITTED", title: "New claim submitted", message: "Amina submitted a claim for Brown Leather Wallet.", isRead: true, createdAt: "2026-06-09T10:30:00Z" },
];

export const auditLogsSeed: AuditLog[] = [
  { id: "a_1", actor: "Ismael Mayar", action: "LOGIN", entityType: "AUTH", entityId: "u_1", ipAddress: "127.0.0.1", createdAt: "2026-06-09T08:00:00Z" },
  { id: "a_2", actor: "Farzana Noor", action: "ADMIN_APPROVE_REPORT", entityType: "REPORT", entityId: "r_2", ipAddress: "127.0.0.1", createdAt: "2026-06-09T08:20:00Z" },
];
