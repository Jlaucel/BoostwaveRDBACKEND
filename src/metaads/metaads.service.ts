import { Injectable } from '@nestjs/common';


@Injectable()
export class MetaadsService {
private readonly accessToken: string;
private readonly baseUrl: string;

    constructor() {
   // this.accessToken = 'EAAJrOiMWuxQBPRZBmdpJQaUJP7hJAFjNLpiA8cZAdotL3ILQWYGc4BAMrv5T7J0kZBgbVuGRZBCRj5HmNw2HpDZAs6S5bJ0KW1yVaoSiyze5bcDZCsanLGosPAZCu118ZBYbsFZC2bfrNRPfZAI0wM2gIh4BHUVzXaMp3lq8cypZAPsAdqncoECbk4iuZCLCf9fTiCO1eJmxvOwjCfKkpCpI7780';
    this.baseUrl = `https://graph.facebook.com/${process.env.META_API_VERSION || 'v23.0'}`;

    }



    async getAdAccounts(accessToken: string) {
        const url = `${this.baseUrl}/me/adaccounts?access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }catch (error) {
            console.error('Error fetching ad accounts:', error);
            throw error;
        }
      
    }

    async getInsights(adAccountId: string, datepreset: string, accessToken: string) {
    const url = `${this.baseUrl}/${adAccountId}/insights?fields=campaign_name,impressions,clicks,spend&date_preset=${datepreset}&access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching ad insights:', error);
            throw error;
        }
    }
}
