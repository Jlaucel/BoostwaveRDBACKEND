import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class MetaadsService {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = `https://graph.facebook.com/${process.env.META_API_VERSION || 'v24.0'}`;
    }

    /**
     * Obtiene todas las cuentas publicitarias del usuario autenticado
     * @param accessToken Token de acceso de Meta Ads
     * @param fields Campos a solicitar (opcional)
     */
    async getAdAccounts(accessToken: string, fields?: string) {
        const defaultFields = 'account_id,name,account_status,currency,timezone_name,amount_spent,balance,min_daily_budget,owner,created_time';
        const requestedFields = fields || defaultFields;
        const url = `${this.baseUrl}/me/adaccounts?fields=${requestedFields}&access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new BadRequestException(`Meta API Error: ${data.error.message}`);
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching ad accounts:', error);
            throw error;
        }
    }

    /**
     * Obtiene una cuenta publicitaria específica con sus campañas
     * @param adAccountId ID de la cuenta publicitaria (ej: act_1245616320222664)
     * @param accessToken Token de acceso de Meta Ads
     * @param includeCampaigns Si incluir las campañas en la respuesta
     */
    async getAdAccount(adAccountId: string, accessToken: string, includeCampaigns: boolean = true) {
        let fields = 'account_id,name,account_status,currency,timezone_name,amount_spent,balance,min_daily_budget,owner,created_time';
        
        if (includeCampaigns) {
            fields += ',campaigns{id,name,status,start_time}';
        }
        
        const url = `${this.baseUrl}/${adAccountId}?fields=${fields}&access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new NotFoundException(`Meta API Error: ${data.error.message}`);
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching ad account:', error);
            throw error;
        }
    }

    /**
     * Obtiene las campañas de una cuenta publicitaria específica
     * @param adAccountId ID de la cuenta publicitaria
     * @param accessToken Token de acceso de Meta Ads
     * @param limit Límite de resultados (default: 25)
     */
    async getCampaigns(adAccountId: string, accessToken: string, limit: number = 25) {
        const url = `${this.baseUrl}/${adAccountId}/campaigns?fields=id,name,status,start_time,end_time,daily_budget,lifetime_budget&limit=${limit}&access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new BadRequestException(`Meta API Error: ${data.error.message}`);
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching campaigns:', error);
            throw error;
        }
    }

    /**
     * Obtiene insights de una cuenta publicitaria
     * @param adAccountId ID de la cuenta publicitaria
     * @param datePreset Preset de fecha (ej: today, yesterday, last_7d, last_30d, etc.)
     * @param accessToken Token de acceso de Meta Ads
     * @param fields Campos adicionales para insights
     */
    async getInsights(
        adAccountId: string, 
        datePreset: string, 
        accessToken: string,
        fields: string = 'campaign_name,impressions,clicks,spend,reach,frequency,cpc,cpm,ctr'
    ) {
        const url = `${this.baseUrl}/${adAccountId}/insights?fields=${fields}&date_preset=${datePreset}&access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new BadRequestException(`Meta API Error: ${data.error.message}`);
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching ad insights:', error);
            throw error;
        }
    }

    /**
     * Obtiene insights de una campaña específica
     * @param campaignId ID de la campaña
     * @param datePreset Preset de fecha
     * @param accessToken Token de acceso de Meta Ads
     * @param fields Campos adicionales para insights
     */
    async getCampaignInsights(
        campaignId: string,
        datePreset: string,
        accessToken: string,
        fields: string = 'campaign_name,impressions,clicks,spend,reach,frequency,cpc,cpm,ctr'
    ) {
        const url = `${this.baseUrl}/${campaignId}/insights?fields=${fields}&date_preset=${datePreset}&access_token=${accessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.error) {
                throw new BadRequestException(`Meta API Error: ${data.error.message}`);
            }
            
            return data;
        } catch (error) {
            console.error('Error fetching campaign insights:', error);
            throw error;
        }
    }
}
