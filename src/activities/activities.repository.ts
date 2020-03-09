import { Repository, EntityRepository } from "typeorm";
import { Activity } from "./activity.entity";
import { CreateActivyDto } from "./dtos/createActivity.dto";

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
}