import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly id?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly username?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly displayName?: string;
}
