import { UsersService } from './users.service';
import { CompanyService } from '../company/company.service';
export declare class UsersController {
    private usersService;
    private companyService;
    constructor(usersService: UsersService, companyService: CompanyService);
    register(body: {
        username: string;
        password: string;
        email: string;
        companyId: number;
        accessToken: string;
        firstName: string;
        lastName: string;
        phone: string;
        profilePictureUrl: string;
    }): Promise<{
        msg: string;
        message?: undefined;
    } | {
        message: string;
        msg?: undefined;
    }>;
    getUser(req: any): Promise<{
        id: number;
        username: string;
        firstName: string;
        companyId: number;
        lastName: string;
        phone: string;
        email: string;
        accessToken: string;
        profilePictureUrl: string;
        company: import("../company/company.entity").Company;
    } | {
        msg: string;
    }>;
}
