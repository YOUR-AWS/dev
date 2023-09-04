import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  host: '127.0.0.1',
  database: 'tiptop_db',
  password: 'root',
  port: 5432,
  synchronize: true,
  logging: true,
  //cache: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
