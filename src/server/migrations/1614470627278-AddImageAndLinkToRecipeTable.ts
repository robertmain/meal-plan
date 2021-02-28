import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds the link column to the [[Recipe]] entity. This allows the recipe link
 * (if any) to be stored in the DB in a special field rather than trying to
 * parse it from the description
 */
export class AddImageAndLinkToRecipeTable1614470627278
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "recipe" ADD "link" text NOT NULL DEFAULT \'\'');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "recipe" DROP COLUMN "link"');
  }
}
