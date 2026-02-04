import type { FileModel } from "@/models/fileModel";
import type { ClaimPair } from "./claimPair";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  email: string;
  photo?: FileModel;
  createdAt: string;
  claims: Array<ClaimPair>;
  roles: Array<string>;
  lastLogin: string;
  isActive?: boolean;
}
