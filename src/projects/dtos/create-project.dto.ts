import { IsOptional, IsString, Length } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @Length(4, 128)
    readonly name: string;

    @IsOptional()
    @IsString()
    @Length(4, 512)
    readonly description?: string;
}
