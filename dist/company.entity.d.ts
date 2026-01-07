import { User } from './user.entity';
export declare class Company {
    id: number;
    rnc: string;
    name: string;
    address: string;
    phone: string;
    logoUrl: string;
    users: User[];
}
