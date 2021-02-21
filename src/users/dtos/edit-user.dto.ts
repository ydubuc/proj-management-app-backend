import { IsNotIn, IsOptional, IsString, IsUrl, Length, ValidateIf } from 'class-validator';
import { RESERVED_KEYWORDS } from '../../resources/constants';

export class EditUserDto {
    @IsOptional()
    @IsNotIn(RESERVED_KEYWORDS)
    @IsString()
    @Length(4, 30)
    readonly displayName: string;

    @IsOptional()
    @ValidateIf((obj) => !RESERVED_KEYWORDS.includes(obj.avatarUrl))
    @IsUrl()
    readonly avatarUrl: string;
}
