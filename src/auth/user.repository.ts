import { EntityRepository, Repository } from "typeorm";
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
                throw new ConflictException(`${username} user already exist`)
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}