import { Controller, Get, Query, Request, BadRequestException, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { MetaadsService } from './metaads.service';
import { UsersService } from '../users/users.service';

@ApiTags('Meta Ads')
@Controller('metaads')
export class MetaadsController {

    constructor(
        private readonly metaadsService: MetaadsService,
        private readonly usersService: UsersService,
    ) {}

    /**
     * Obtiene la cuenta publicitaria del usuario autenticado
     * Filtra automáticamente por el metaAdAccountId del usuario
     */
    @Get('my-account')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get Meta Ads account for authenticated user' })
    @ApiQuery({ name: 'access_token', required: true, description: 'Meta Ads access token' })
    @ApiQuery({ name: 'includeCampaigns', required: false, type: Boolean, description: 'Include campaigns in response' })
    async getMyAccount(
        @Request() req,
        @Query('access_token') accessToken: string,
        @Query('includeCampaigns') includeCampaigns?: string
    ) {
        if (!accessToken) {
            throw new BadRequestException('access_token is required');
        }

        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            throw new BadRequestException('User not authenticated');
        }

        // Obtener el usuario y su metaAdAccountId
        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.metaAdAccountId) {
            throw new NotFoundException('User does not have a Meta Ads account ID configured');
        }

        const includeCampaignsFlag = includeCampaigns === 'true' || includeCampaigns === '1';
        
        return this.metaadsService.getAdAccount(user.metaAdAccountId, accessToken, includeCampaignsFlag);
    }

    /**
     * Obtiene las campañas de la cuenta publicitaria del usuario autenticado
     */
    @Get('my-account/campaigns')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get campaigns for authenticated user\'s Meta Ads account' })
    @ApiQuery({ name: 'access_token', required: true, description: 'Meta Ads access token' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit of results (default: 25)' })
    async getMyCampaigns(
        @Request() req,
        @Query('access_token') accessToken: string,
        @Query('limit') limit?: string
    ) {
        if (!accessToken) {
            throw new BadRequestException('access_token is required');
        }

        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            throw new BadRequestException('User not authenticated');
        }

        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.metaAdAccountId) {
            throw new NotFoundException('User does not have a Meta Ads account ID configured');
        }

        const limitNum = limit ? parseInt(limit, 10) : 25;
        
        return this.metaadsService.getCampaigns(user.metaAdAccountId, accessToken, limitNum);
    }

    /**
     * Obtiene insights de la cuenta publicitaria del usuario autenticado
     */
    @Get('my-account/insights')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get insights for authenticated user\'s Meta Ads account' })
    @ApiQuery({ name: 'access_token', required: true, description: 'Meta Ads access token' })
    @ApiQuery({ name: 'date_preset', required: true, description: 'Date preset (today, yesterday, last_7d, last_30d, etc.)' })
    @ApiQuery({ name: 'fields', required: false, description: 'Additional fields for insights' })
    async getMyAccountInsights(
        @Request() req,
        @Query('access_token') accessToken: string,
        @Query('date_preset') datePreset: string,
        @Query('fields') fields?: string
    ) {
        if (!accessToken) {
            throw new BadRequestException('access_token is required');
        }

        if (!datePreset) {
            throw new BadRequestException('date_preset is required');
        }

        const userId = req.user?.userId || req.user?.id;
        if (!userId) {
            throw new BadRequestException('User not authenticated');
        }

        const user = await this.usersService.findOne(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!user.metaAdAccountId) {
            throw new NotFoundException('User does not have a Meta Ads account ID configured');
        }

        return this.metaadsService.getInsights(user.metaAdAccountId, datePreset, accessToken, fields);
    }

    /**
     * Obtiene insights de una campaña específica del usuario autenticado
     */
    @Get('my-account/campaigns/:campaignId/insights')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get insights for a specific campaign of authenticated user' })
    @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
    @ApiQuery({ name: 'access_token', required: true, description: 'Meta Ads access token' })
    @ApiQuery({ name: 'date_preset', required: true, description: 'Date preset (today, yesterday, last_7d, last_30d, etc.)' })
    @ApiQuery({ name: 'fields', required: false, description: 'Additional fields for insights' })
    async getMyCampaignInsights(
        @Request() req,
        @Param('campaignId') campaignId: string,
        @Query('access_token') accessToken: string,
        @Query('date_preset') datePreset: string,
        @Query('fields') fields?: string
    ) {
        if (!accessToken) {
            throw new BadRequestException('access_token is required');
        }

        if (!datePreset) {
            throw new BadRequestException('date_preset is required');
        }

        if (!campaignId) {
            throw new BadRequestException('campaignId is required');
        }

        const userId = req.user?.id;
        if (!userId) {
            throw new BadRequestException('User not authenticated');
        }

        // Verificar que el usuario tiene metaAdAccountId configurado
        const user = await this.usersService.findOne(userId);
        if (!user || !user.metaAdAccountId) {
            throw new NotFoundException('User does not have a Meta Ads account ID configured');
        }

        return this.metaadsService.getCampaignInsights(campaignId, datePreset, accessToken, fields);
    }
    
}
