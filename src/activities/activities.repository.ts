import { Repository, EntityRepository } from "typeorm";
import { Activity } from "./activity.entity";

@EntityRepository(Activity)
export class ActivitiesRepository extends Repository<Activity>{

}