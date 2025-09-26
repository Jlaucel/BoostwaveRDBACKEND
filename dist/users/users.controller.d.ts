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
    }): Promise<{
        msg: string;
        message?: undefined;
    } | {
        message: string;
        msg?: undefined;
    }>;
    getUser(req: any): Promise<{
        id: number;
        companyId: number;
        username: string;
        company: import("../company.entity").Company;
        email: string;
        accessToken: string;
    } | {
        msg: string;
    }>;
}
