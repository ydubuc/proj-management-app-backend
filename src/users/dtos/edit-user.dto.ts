import { IsOptional, IsString, IsUrl, Length, ValidateIf } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsString()
    @Length(4, 30)
    readonly displayName: string;

    @IsOptional()
    @ValidateIf((obj) => obj.avatarUrl !== '$delete')
    @IsUrl()
    readonly avatarUrl: string;
}
