import { ValidationPipe, BadRequestException } from "@nestjs/common";
import { ActivityType } from "../activityType.enum";

export class TypeValidatorPipe extends ValidationPipe{
    readonly allowedTypes = [...Object.values(ActivityType)]

    transform(value: any){
        if(!this.isValid(value)){
            throw new BadRequestException(`${value} is an invalid type`)
        } else {
            return value
        }
    }

    private isValid(value: any){
        const idx = this.allowedTypes.indexOf(value)
        return idx !== -1
    }
}