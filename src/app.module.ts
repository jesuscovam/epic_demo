import { Module } from '@nestjs/common';
import { ActivitiesModule } from './activities/activities.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeConfig),
    ActivitiesModule,
    AuthModule],
})
export class AppModule {}
