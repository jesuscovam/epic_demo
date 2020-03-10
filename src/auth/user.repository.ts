import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentials } from "./dtos/createUser.dto";
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(authCredentials: AuthCredentials): Promise<User>{
        const { username, password } = authCredentials
        const user = new User()
        
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)

        try {
            await user.save()
            return user
        } catch (error) {
            if (error.code === '23505'){
                throw new UnauthorizedException(`${username} username is already taken`)
            }
        }
        
    }

    async validation(authCredentials: AuthCredentials): Promise<User>{
        const { username, password } = authCredentials
        const user = await this.findOne(username)

        if(!user.validatePassword(password)){
            throw new UnauthorizedException(`Invalid credentials`)
        } else{
            return user
        }
    }

    private async hashPassword(password: string, salt: string){
        return await bcrypt.hash(password, salt)
    }
}