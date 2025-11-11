import { ApiFile } from "@/models";
import { MaritalStatus } from "./maritalStatus";

export interface Profile {
    id: number;
    profileId: number;
    age: number;
    firstName: string;
    phoneNumber: string;
    lastName: string;
    profession?: string;
    gender: string;
    photoUrl?: string;
    address: string;
    email: string;
    dateOfBirth: string | Date;
    maritalStatus: MaritalStatus;
    dni: string;
    landline: string;
    officePhone?: string;
    nationality: string;
    photo?: ApiFile;
    label?: string;
    createdAt: string;
    city: string;
}