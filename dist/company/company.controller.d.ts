import { CompanyService } from './company.service';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(body: any): Promise<import("../company.entity").Company>;
    findAll(): Promise<import("../company.entity").Company[]>;
    findOne(id: string): Promise<import("../company.entity").Company | null>;
    update(id: string, body: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
