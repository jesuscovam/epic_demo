import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import {  AuthCredentials } from './dtos/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    signUp(authCredentials: AuthCredentials): Promise<User>{
        return this.userRepository.signUp(authCredentials)
    }
}
