import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'agosto2018',
    database: 'bftokens',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}