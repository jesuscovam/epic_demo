import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/createUser.dto";
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async signUp(createUserDto: CreateUserDto): Promise<User>{
        const { username, password } = createUserDto
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

    private async hashPassword(password: string, salt: string){
        return await bcrypt.hash(password, salt)
    }
}