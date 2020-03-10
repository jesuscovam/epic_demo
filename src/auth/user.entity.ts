import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    async validate(password: string){
        return await bcrypt.hash(password, this.salt)
    }
}