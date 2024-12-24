import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735080023305 implements MigrationInterface {
    name = 'Migrations1735080023305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_76c135c22640a1d7e00319ede81"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "categoryId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_76c135c22640a1d7e00319ede81" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
