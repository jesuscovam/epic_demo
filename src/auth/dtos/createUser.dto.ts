import { IsString, MaxLength, MinLength, Matches } from "class-validator"

export class CreateUserDto{

    @IsString()
    @MaxLength(20)
    @MinLength(4)
    username: string

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$'))
    password: string
}