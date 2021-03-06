import { IsArray, IsIn, IsOptional, IsString, IsUrl, Length } from 'class-validator';

const DELETABLE_FIELDS = ['avatarUrl'];

export class EditUserDto {
    @IsOptional()
    @IsString()
    @Length(4, 30)
    readonly displayName?: string;

    @IsOptional()
    @IsUrl()
    readonly avatarUrl?: string;

    @IsOptional()
    @IsArray()
    @IsIn(DELETABLE_FIELDS, { each: true })
    readonly deleteFields?: string[];
}
