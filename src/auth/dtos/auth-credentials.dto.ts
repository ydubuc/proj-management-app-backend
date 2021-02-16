import {
    IsEmail,
    IsLowercase,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
    @IsOptional()
    @IsString()
    @MinLength(4)
    @MaxLength(24)
    @Matches(/[A-Za-z0-9]/)
    @IsLowercase()
    readonly username: string;

    @IsOptional()
    @IsString()
    @MinLength(5)
    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(255)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    readonly password: string;
}
