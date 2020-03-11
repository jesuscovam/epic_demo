import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import * as bcrypt from 'bcrypt'
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto
        const user = new User()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(password, user.salt)
        try {
            await user.save()
        } catch (error) {
            if(error.code === '23505'){
                throw new ConflictException(`${username} user is already taken`)
            }else{
                throw new InternalServerErrorException()
            }
        }
    }

    async validation(authCredentials: AuthCredentialsDto): Promise<string>{
        const { username, password } = authCredentials
        const user = await this.findOne({username})
        if(user && await user.validation(password)){
            return user.username
        } else {
            return null
        }
    }
}