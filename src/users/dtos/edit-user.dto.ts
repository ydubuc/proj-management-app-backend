import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class EditUserDto {
    @IsOptional()
    @IsString()
    @Length(4, 30)
    readonly displayName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly avatarUrl: string;
}
