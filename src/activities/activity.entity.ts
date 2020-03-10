import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString } from 'class-validator'
import { ActivityType } from "./activityType.enum";

@Entity()
export class Activity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @IsString()
    @Column()
    title: string

    @IsString()
    @Column()
    description: string

    @Column()
    type: ActivityType
}