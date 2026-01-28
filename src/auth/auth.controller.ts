import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post('login')
    async login (@Body() body: {username: string; password: string}){

        const user = await this.authService.validateUser(body.username, body.password);
        if(!user) return { message: 'Usuario o Contraseña incorrectos' };

        return this.authService.login(user);
    }

    
}
