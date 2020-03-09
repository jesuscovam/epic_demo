import { Injectable } from '@nestjs/common';
import { ActivitiesRepository } from './activities.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateActivyDto } from './dtos/createActivity.dto';
import { Activity } from './activity.entity';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectRepository(ActivitiesRepository)
        private activitiesRepository: ActivitiesRepository){}
    
    createActivity(createActivityDto: CreateActivyDto): Promise<Activity>{
        return this.activitiesRepository.createActivity(createActivityDto)
    }
}
