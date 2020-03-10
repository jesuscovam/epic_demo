import { ActivityType } from "../activityType.enum"

export class GetActivitiesFilteredDto{
    search: string
    type: ActivityType
}