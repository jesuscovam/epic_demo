import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signUn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.authService.signUp(authCredentialsDto)
    }
}
