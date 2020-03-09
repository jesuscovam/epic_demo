import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivyDto } from './dtos/createActivity.dto';
import { Activity } from './activity.entity';

@Controller('activities')
export class ActivitiesController {
    constructor(private activitiesService: ActivitiesService){}

    @Post()
    createActivity(@Body() createActivityDto: CreateActivyDto): Promise<Activity>{
        return this.activitiesService.createActivity(createActivityDto)
    }

    @Get('/:id')
    getActivityById(@Param('id') id: number): Promise<Activity>{
        return this.activitiesService.getActivityById(id)
    }
}
