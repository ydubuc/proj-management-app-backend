import { IsNotIn, IsOptional, IsString, Length, ValidateIf } from 'class-validator';
import { RESERVED_KEYWORDS } from '../../resources/constants';

export class EditProjectDto {
    @IsOptional()
    @IsNotIn(RESERVED_KEYWORDS)
    @IsString()
    @Length(4, 128)
    readonly name?: string;

    @IsOptional()
    @ValidateIf((obj) => !RESERVED_KEYWORDS.includes(obj.description))
    @IsString()
    @Length(4, 512)
    readonly description?: string;
}
