import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { JwtPayload } from './jwt.payload.interface'
import { UnauthorizedException } from '@nestjs/common'

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        })
    }

    async validate(payload: JwtPayload){
        const { username } = payload
        const user = await this.userRepository.findOne({ username })
        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }else{
            return user
        }
    }
}