import { BaseEntity, Entity, Unique, PrimaryGeneratedColumn, Column } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity()
@Unique(['username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @Column()
    salt: string

    async validation(password: string){
        return await bcrypt.hash(password, this.salt)
    }
}