import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetProjectsFilterDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
