import { Controller, Post, Body, Get, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CompanyService } from '../company/company.service'; // importa el servicio de companies

@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
        private companyService: CompanyService // inyecta el servicio
    ) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string; email: string; companyId: number }) {

        // Validar que la empresa existe
        const company = await this.companyService.findOne(body.companyId);
        if (!company) {
            throw new BadRequestException('La empresa no existe');
        }

        const existingUser = await this.usersService.findUserByUsername(body.username);
        if (existingUser) return {msg: 'User already exists' };

        await this.usersService.createUser(body.username, body.password, body.email, body.companyId);
        return { message: 'User registered successfully' };
    }

    @Get('getUser')
    @UseGuards(JwtAuthGuard)
    async getUser(@Request() req) {
        // req.user viene del JWT (payload)

        const username = req.user?.username;
        if (!username) return { msg: 'No user in token' };

        const user = await this.usersService.findUserByUsername(username);
        
        if (!user) return { msg: 'User not found' + username };
      

        const { password, ...result } = user;
        return result;
    }

}
