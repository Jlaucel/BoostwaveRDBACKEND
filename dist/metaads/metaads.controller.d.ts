import { MetaadsService } from './metaads.service';
export declare class MetaadsController {
    private readonly metaadsService;
    constructor(metaadsService: MetaadsService);
    getAdAccounts(accessToken: string): Promise<any>;
    getInsights(adAccountId: string, datepreset: string, accessToken: string): Promise<any>;
}
