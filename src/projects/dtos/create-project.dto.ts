import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(128)
    readonly name: string;
}
