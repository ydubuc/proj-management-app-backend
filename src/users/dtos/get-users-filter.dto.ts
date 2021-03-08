import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly id?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly name?: string;
}
