import { IsNotEmpty, IsOptional, IsString, IsUrl, Length, ValidateIf } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsString()
    @Length(4, 30)
    readonly displayName: string;

    @ValidateIf((obj) => obj.avatarUrl !== '$delete')
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    readonly avatarUrl: string;
}
