import type { Role } from "../features/auth/models/role";
import type { FileModel } from "@/models/fileModel";
import type { ClaimPair } from "../features/auth/models/claimPair";

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
  roles: Array<Role>;
  lastLogin: string;
  isActive: boolean;
}

export interface PropsWithUser { user: User }