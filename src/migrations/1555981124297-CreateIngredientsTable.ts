import {
  MigrationInterface,
  QueryRunner,
  Table,
} from 'typeorm';

export class CreateIngredientsTable1555981124297 implements MigrationInterface {
  private ingredientTable: Table = new Table({
    name: 'ingredient',
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
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.ingredientTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.ingredientTable);
  }
}
