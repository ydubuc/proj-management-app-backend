import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import { AuthAccessInfoDto } from './dtos/auth-access-info.dto';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(authCredentialsDto: AuthCredentialsDto): Promise<AuthAccessInfoDto> {
        try {
            await this.usersService.saveNewUser(authCredentialsDto);
            const accessInfo = await this.login(authCredentialsDto);
            return accessInfo;
        } catch (error) {
            throw error;
        }
    }

    async login(authCrendetialsDto: AuthCredentialsDto): Promise<AuthAccessInfoDto> {
        try {
            const user = await this.verifyCredentials(authCrendetialsDto);
            const uid = user.getId();
            const username = user.username;
            const payload: JwtPayload = { uid, username };

            const accessToken = await this.jwtService.signAsync(payload);
            return { accessToken };
        } catch (error) {
            throw error;
        }
    }

    private async verifyCredentials(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, email } = authCredentialsDto;
        if (!username && !email) {
            throw new UnauthorizedException('Missing credentials.');
        }

        try {
            let user: User;
            if (username) {
                user = await this.usersService.getUserByUsernameWithSensitiveInfo(username);
            } else if (email) {
                user = await this.usersService.getUserByEmailWithSensitiveInfo(email);
            }

            if (user && (await user.verifyPassword(authCredentialsDto.password))) {
                return user;
            } else {
                throw new UnauthorizedException('Invalid credentials.');
            }
        } catch (error) {
            throw error;
        }
    }
}
