import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post()
    signUp(@Body() createUserDto: CreateUserDto): Promise<User>{
        return this.authService.signUp(createUserDto)
    }
}
