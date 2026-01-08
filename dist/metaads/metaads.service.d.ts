export declare class MetaadsService {
    private readonly accessToken;
    private readonly baseUrl;
    constructor();
    getAdAccounts(accessToken: string): Promise<any>;
    getInsights(adAccountId: string, datepreset: string, accessToken: string): Promise<any>;
}
