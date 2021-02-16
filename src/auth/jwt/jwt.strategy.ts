import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist/passport/passport.strategy';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../../users/models/user.model';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        try {
            const user = await this.usersService.getUserById(payload.uid);
            if (!user) {
                throw new UnauthorizedException();
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}
