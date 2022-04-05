import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const ormConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'contacts',
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default ormConfig;
