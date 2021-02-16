import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthAccessInfoDto } from './dtos/auth-access-info.dto';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    async register(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<AuthAccessInfoDto> {
        return this.authService.register(authCredentialsDto);
    }

    @Post('/login')
    async login(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
    ): Promise<AuthAccessInfoDto> {
        return this.authService.login(authCredentialsDto);
    }
}
