import type { FileModel } from "@/models/fileModel";


export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  email: string;
  photo?: FileModel;
  createdAt: string;
}
