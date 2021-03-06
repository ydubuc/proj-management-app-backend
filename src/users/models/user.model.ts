import { UnauthorizedException } from '@nestjs/common';
import { getModelForClass, prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { ProjectMember } from '../../projects/models/project-member.model';

export class User {
    getId(): string {
        return this['_id'];
    }

    @prop({
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 24,
    })
    username: string;

    @prop({
        required: true,
        minlength: 4,
        maxlength: 30,
    })
    displayName: string;

    @prop({
        required: true,
        unique: true,
        minlength: 5,
    })
    email: string;

    @prop({
        required: true,
    })
    salt: string;

    @prop({
        required: true,
        minlength: 8,
        maxlength: 255,
    })
    password: string;

    @prop({
        required: false,
    })
    avatarUrl?: string;

    @prop({
        required: true,
    })
    createdAt: number;

    async verifyPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    hideSensitiveInfo() {
        this.email = null;
        this.salt = null;
        this.password = null;
    }

    guardAuthor(username: string) {
        if (username !== this.username) {
            throw new UnauthorizedException();
        }
    }

    toProjectMember(): ProjectMember {
        const member = new ProjectMember();
        member.uid = this.getId().toString();
        member.username = this.username;
        member.displayName = this.displayName;
        if (this.avatarUrl) {
            member.avatarUrl = this.avatarUrl;
        }
        return member;
    }
}

export const UserModel = getModelForClass(User);
