import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { EditUserDto } from './dtos/edit-user.dto';
import { GetUsersFilterDto } from './dtos/get-users-filter.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getUsers(@Query(ValidationPipe) getUsersFilterDto: GetUsersFilterDto): Promise<User[]> {
        return this.usersService.getUsers(getUsersFilterDto);
    }

    @Get('/:username')
    async getUserByUsername(@Param('username') username: string): Promise<User> {
        return this.usersService.getUserByUsername(username);
    }

    @Patch('/:username')
    async editUser(
        @GetUser() user: User,
        @Param('username') username: string,
        @Body(ValidationPipe) editUserDto: EditUserDto,
    ): Promise<User> {
        return this.usersService.editUser(user, username, editUserDto);
    }
}
