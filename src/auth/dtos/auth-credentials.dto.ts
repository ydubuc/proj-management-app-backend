import { IsEmail, IsLowercase, IsOptional, IsString, Length, Matches } from 'class-validator';

export class AuthCredentialsDto {
    @IsOptional()
    @IsString()
    @IsLowercase()
    @Length(4, 24)
    @Matches(/[A-Za-z0-9]/)
    readonly username: string;

    @IsOptional()
    @IsEmail()
    readonly email: string;

    @IsString()
    @Length(8, 255)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    readonly password: string;
}
