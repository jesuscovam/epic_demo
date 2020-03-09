import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ActivityType } from "./activityType.enum";

@Entity()
export class Activity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    type: ActivityType
}