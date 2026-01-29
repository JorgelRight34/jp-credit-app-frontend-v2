import { ApiFile } from "@/models";


export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  email: string;
  photo?: ApiFile;
  createdAt: string;
}
