import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/createUser.dto";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const { username, password } = createUserDto
        const user = new User()
        
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)
        await user.save()
        return user
    }

    private async hashPassword(password: string, salt: string){
        return await bcrypt.hash(password, salt)
    }
}