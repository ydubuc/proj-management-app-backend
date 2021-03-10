import { prop } from '@typegoose/typegoose';
import { IsNotEmpty, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class ProjectMember {
    @IsNotEmpty()
    @IsString()
    @prop({
        required: true,
    })
    uid: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 24)
    @prop({
        required: true,
        minlength: 4,
        maxlength: 24,
    })
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(4, 30)
    @prop({
        required: true,
        minlength: 4,
        maxlength: 30,
    })
    displayName: string;

    @IsOptional()
    @IsUrl()
    @prop({
        required: false,
    })
    avatarUrl?: string;
}
