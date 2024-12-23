import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1734984505448 implements MigrationInterface {
    name = 'Migrations1734984505448'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id")`);
    }

}
