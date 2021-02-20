import {
  MigrationInterface,
  QueryRunner,
} from 'typeorm';

export class CreateRecipeTable1557104545105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "recipe" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" text NOT NULL, "description" text NOT NULL DEFAULT \'\', CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "recipe_ingredients_ingredient" ("recipeId" uuid NOT NULL, "ingredientId" uuid NOT NULL, CONSTRAINT "PK_6e193bb10a2cd8a65929edf7d07" PRIMARY KEY ("recipeId", "ingredientId"))');
    await queryRunner.query('CREATE INDEX "IDX_b67e81a9afa83f2ee13440175c" ON "recipe_ingredients_ingredient" ("recipeId") ');
    await queryRunner.query('CREATE INDEX "IDX_d2bbcf7bab477bfdcec65465c0" ON "recipe_ingredients_ingredient" ("ingredientId") ');
    await queryRunner.query('ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "recipe_ingredients_ingredient" ADD CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_d2bbcf7bab477bfdcec65465c0c"');
    await queryRunner.query('ALTER TABLE "recipe_ingredients_ingredient" DROP CONSTRAINT "FK_b67e81a9afa83f2ee13440175ce"');
    await queryRunner.query('DROP INDEX "IDX_d2bbcf7bab477bfdcec65465c0"');
    await queryRunner.query('DROP INDEX "IDX_b67e81a9afa83f2ee13440175c"');
    await queryRunner.query('DROP TABLE "recipe_ingredients_ingredient"');
    await queryRunner.query('DROP TABLE "recipe"');
  }
}
