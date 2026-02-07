import type { MaritalStatus } from "./maritalStatus";
import type { Photo } from "@/models";
import type { FileModel } from "@/models/fileModel";

export interface Profile {
    id: number;
    profileId: number;
    age: number;
    firstName: string;
    phoneNumber: string;
    lastName: string;
    profession?: string;
    gender: string;
    files: Array<FileModel>;
    address: string;
    email: string;
    dateOfBirth: string;
    maritalStatus: MaritalStatus;
    dni: string;
    landline: string;
    officePhone?: string;
    nationality: string;
    photo?: Photo;
    label?: string;
    createdAt: string;
    city: string;
}