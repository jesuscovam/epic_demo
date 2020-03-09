import { ActivityType } from "../activityType.enum"

export class CreateActivyDto{
    title: string
    description: string
    type: ActivityType
}