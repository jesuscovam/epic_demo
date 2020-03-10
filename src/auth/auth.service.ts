import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    signUp(authCredentials: AuthCredentialsDto): Promise<void>{
        return this.userRepository.signUp(authCredentials)
    }
}
