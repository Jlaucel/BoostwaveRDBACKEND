import { Controller, Get, Query } from '@nestjs/common';
import { MetaadsService } from './metaads.service';

@Controller('metaads')
export class MetaadsController {

    constructor(private readonly metaadsService: MetaadsService) {}

    @Get('adaccounts')
    async getAdAccounts(@Query('accessToken') accessToken: string) {
        return this.metaadsService.getAdAccounts(accessToken);
    }

    @Get('insights')
    async getInsights(
        @Query('adAccountId') adAccountId: string,
        @Query('datepreset') datepreset: string,
        @Query('accessToken') accessToken: string
    ) {
        return this.metaadsService.getInsights(adAccountId, datepreset, accessToken);
    }
    
}
