import { Company } from './company.entity';
export declare class User {
    id: number;
    username: string;
    firstName: string;
    companyId: number;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    accessToken: string;
    profilePictureUrl: string;
    company: Company;
}
