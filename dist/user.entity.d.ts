import { Company } from './company.entity';
export declare class User {
    id: number;
    companyId: number;
    username: string;
    company: Company;
    password: string;
    email: string;
    accessToken: string;
}
