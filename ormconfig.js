const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
} = process.env;

module.exports = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: ['src/server/**/*.entity{.ts,.js}'],
  migrations: ['src/server/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/server/migrations',
  },
};
