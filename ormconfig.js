const {
  DATABASE_URL,
} = process.env;

module.exports = {
  type: 'postgres',
  url: DATABASE_URL,
  entities: ['src/server/**/*.entity{.ts,.js}'],
  migrations: ['src/server/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/server/migrations',
  },
};
