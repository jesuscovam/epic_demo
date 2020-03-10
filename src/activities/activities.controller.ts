import { Controller, Post, Body, Get, Param, Delete, Query, Patch } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivyDto } from './dtos/createActivity.dto';
import { Activity } from './activity.entity';
import { GetActivitiesFilteredDto } from './dtos/getActivitiesFiltered.dto';
import { ActivityType } from './activityType.enum';
import { TypeValidatorPipe } from './pipes/type.validator.pipe';

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

    @Get()
    getActivities(@Query() getActivitiesFiltered: GetActivitiesFilteredDto): Promise<Activity []>{
        return this.activitiesService.getActivities(getActivitiesFiltered)
    }

    @Delete('/:id')
    deleteById(@Param('id') id: number): Promise<void>{
        return this.activitiesService.deleteById(id)
    }

    @Patch('/:id')
    updateActivity(
        @Param('id') id: number,
        @Body('type', TypeValidatorPipe) type: ActivityType
    ): Promise<Activity>{
        return this.activitiesService.updateActivity(id, type)
    }

}
