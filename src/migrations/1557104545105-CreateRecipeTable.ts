import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRecipeTable1557104545105 implements MigrationInterface {

  private ingredientsFK = new TableForeignKey({
    name: 'FK_recipe_ingredients_ingredient_recipe',
    columnNames: ['recipeId'],
    referencedTableName: 'recipe',
    referencedColumnNames: ['id'],
  });

  private recipeFK = new TableForeignKey({
    name: 'FK_recipe_ingredients_ingredient_ingredient',
    columnNames: ['ingredientId'],
    referencedTableName: 'ingredient',
    referencedColumnNames: ['id'],
  });

  private recipeTable = new Table({
    name: 'recipe',
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
  });

  private recipeIngredientsPivotTable = new Table({
    name: 'recipe_ingredients_ingredient',
    columns: [
      {
        name: 'recipeId',
        type: 'int',
        isPrimary: true,
      },
      {
        name: 'ingredientId',
        type: 'int',
        isPrimary: true,
      },
    ],
    foreignKeys: [
      this.recipeFK,
      this.ingredientsFK,
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      queryRunner.createTable(this.recipeTable),
      queryRunner.createTable(this.recipeIngredientsPivotTable),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(
      this.recipeIngredientsPivotTable,
      [
        this.ingredientsFK,
        this.recipeFK,
      ]
    );

    await Promise.all([
      queryRunner.dropTable(this.recipeTable),
      queryRunner.dropTable(this.recipeIngredientsPivotTable),
    ]);
  }
}
