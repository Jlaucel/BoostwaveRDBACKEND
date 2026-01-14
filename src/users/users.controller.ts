import { Controller, Post, Body, Get, Request, Put, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { BaseController } from '../common/controllers/base.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Public } from '../auth/public.decorator';
import { CompanyService } from '../company/company.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryDto } from '../common/dtos/query.dto';
import { PaginatedResponseDto } from '../common/dtos/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController extends BaseController<User> {
    constructor(
        private usersService: UsersService,
        private companyService: CompanyService
    ) {
        super(usersService);
    }

    getEntityName(): string {
        return 'User';
    }

    /**
     * Helper method to exclude password from user object
     */
    private excludePassword(user: User): Omit<User, 'password'> {
        const { password, ...result } = user;
        return result;
    }

    /**
     * Override findAll to exclude password from response
     */
    @Get()
    async findAll(@Query() queryDto: QueryDto): Promise<PaginatedResponseDto<User> | User[]> {
        const result = await this.service.findAll(queryDto);
        
        if (Array.isArray(result)) {
            return result.map(user => this.excludePassword(user) as User);
        }
        
        return {
            ...result,
            data: result.data.map(user => this.excludePassword(user) as User),
        } as PaginatedResponseDto<User>;
    }

    @Get('getUser')
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Get current user from JWT token' })
    async getUser(@Request() req) {
        const username = req.user?.username;
        if (!username) {
            return { msg: 'No user in token' };
        }

        const user = await this.usersService.findUserByUsername(username);
        
        if (!user) {
            return { msg: 'User not found: ' + username };
        }

        return this.excludePassword(user);
    }

    /**
     * Override findOne to exclude password from response
     * IMPORTANT: This must be AFTER specific routes like 'getUser'
     */
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.service.findOne(id);
        return this.excludePassword(user) as User;
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createDto: CreateUserDto): Promise<User> {
        const user = await this.service.create(createDto);
        return this.excludePassword(user) as User;
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiBody({ type: UpdateUserDto })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateUserDto,
    ): Promise<User> {
        const user = await this.service.update(id, updateDto);
        return this.excludePassword(user) as User;
    }

    @Public()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user (legacy endpoint)' })
    @ApiBody({ type: CreateUserDto })
    async register(@Body() body: CreateUserDto) {
        const user = await this.service.create(body);
        return { message: 'User registered successfully', userId: user.id };
    }

    /**
     * Override restore to exclude password from response
     * Note: We need to cast the return type to match base class signature
     */
    @Post(':id/restore')
    async restore(@Param('id', ParseIntPipe) id: number): Promise<User> {
        const user = await this.service.restore(id);
        return this.excludePassword(user) as User;
    }

}
