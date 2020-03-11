import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { JwtPayload } from './jwt.payload.interface';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ){}

    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentialsDto)
    }

    async validation(authCredentials: AuthCredentialsDto): Promise<{accessToken: string}>{
        const username = await this.userRepository.validation(authCredentials)
        if(Object.is(username, null)){
            throw new UnauthorizedException('Invalid credentials')
        } else {
            const payload: JwtPayload = { username }
            const accessToken = await this.jwtService.sign(payload)
            return { accessToken }
        }
    }
}
