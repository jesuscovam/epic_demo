import { Repository, EntityRepository } from "typeorm";
import { Activity } from "./activity.entity";
import { CreateActivyDto } from "./dtos/createActivity.dto";
import { GetActivitiesFilteredDto } from "./dtos/getActivitiesFiltered.dto";

@EntityRepository(Activity)
export class ActivitiesRepository extends Repository<Activity>{
    async createActivity(createActivityDto: CreateActivyDto): Promise<Activity>{
        const { title, description, type } = createActivityDto
        const activity = new Activity()
        activity.title = title
        activity.description = description
        activity.type = type
        await activity.save()
        return activity
    }

    async getActivities(activitiesFilteredDto: GetActivitiesFilteredDto): Promise<Activity []>{
        const { search, type } = activitiesFilteredDto
        const query = await this.createQueryBuilder('activity')
        if(search){
            query.andWhere('(activity.title LIKE :search OR activity.description LIKE :search)',
            {search: `%${search}%`})
        }

        if(type){
            query.andWhere('activity.type = :type', {type})
        }
        const activities = await query.getMany()
        return activities

    }
}