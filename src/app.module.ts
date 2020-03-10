import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeConfig } from './config/typeorm.config';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeConfig),
    ActivitiesModule,],
})
export class AppModule {}
