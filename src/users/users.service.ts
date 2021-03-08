import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from '../auth/dtos/auth-credentials.dto';
import { EditUserDto } from './dtos/edit-user.dto';
import { User, UserModel } from './models/user.model';
import * as bcrypt from 'bcryptjs';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';

@Injectable()
export class UsersService {
    async saveNewUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, email, password } = authCredentialsDto;
        if (!username || !email) {
            throw new UnauthorizedException('Missing credentials.');
        }

        const user = new UserModel();
        user.username = username.trim();
        user.displayName = user.username;
        user.email = email.toLowerCase().trim();
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, user.salt);
        user.createdAt = Date.now();

        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists.');
            } else {
                throw new InternalServerErrorException(
                    'An error occured while creating your account.',
                );
            }
        }
    }

    async getUsers(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        try {
            const users = await this.getUsersWithSensitiveInfo(getUsersFilterDto);
            users.forEach((user) => user.hideSensitiveInfo());
            return users;
        } catch (error) {
            throw error;
        }
    }

    async getUsersWithSensitiveInfo(getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        const { id, username, displayName } = getUsersFilterDto;
        const query = {};

        if (id) {
            query['_id'] = id;
        }
        if (username) {
            query['username'] = { $regex: `.*${[username]}.*` };
        }
        if (displayName) {
            query['displayName'] = { $regex: `.*${[displayName]}.*` };
        }
        if (!Object.keys(query).length) {
            throw new NotFoundException('Query parameters too broad.');
        }

        try {
            const users = await UserModel.find(query).limit(10);
            return users;
        } catch (error) {
            throw new NotFoundException();
        }
    }

    async getUserByIdWithSensitiveInfo(id: string): Promise<User> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.getUserByIdWithSensitiveInfo(id);
        if (user) {
            user.hideSensitiveInfo();
        }
        return user;
    }

    async getUserByUsernameWithSensitiveInfo(username: string): Promise<User> {
        try {
            const user = await UserModel.findOne({ username });
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.getUserByUsernameWithSensitiveInfo(username);
        if (user) {
            user.hideSensitiveInfo();
        }
        return user;
    }

    async getUserByEmailWithSensitiveInfo(email: string): Promise<User> {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (error) {
            return null;
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        const user = await this.getUserByEmailWithSensitiveInfo(email);
        if (user) {
            user.hideSensitiveInfo();
        }
        return user;
    }

    async editUser(user: User, username: string, editUserDto: EditUserDto): Promise<User> {
        user.guardAuthor(username);

        const updates = {};
        const options = { new: true };

        for (const [key, value] of Object.entries(editUserDto)) {
            if (key !== 'deleteFields') {
                updates[key] = value;
            } else {
                const deletes = {};
                for (const field of value) {
                    deletes[field] = '';
                }
                updates['$unset'] = deletes;
            }
        }

        try {
            const user = await UserModel.findOneAndUpdate({ username }, updates, options);
            user.hideSensitiveInfo();
            return user;
        } catch (error) {
            throw new NotFoundException('User not found.');
        }
    }
}
