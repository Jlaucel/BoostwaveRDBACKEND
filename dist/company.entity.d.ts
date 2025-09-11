import { User } from './user.entity';
export declare class Company {
    id: number;
    name: string;
    address: string;
    phone: string;
    users: User[];
}
