import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateRecipeTable1557104545105 implements MigrationInterface {
  private tableName: string = 'recipe';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'NOW()',
          isNullable: false,
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'NOW()',
          isNullable: false,
        },
        {
          name: 'deletedAt',
          type: 'timestamp',
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
