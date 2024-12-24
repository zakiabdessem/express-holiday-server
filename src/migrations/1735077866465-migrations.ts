import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735077866465 implements MigrationInterface {
    name = 'Migrations1735077866465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "passengers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "ticketNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ticketId" integer, CONSTRAINT "PK_9863c72acd866e4529f65c6c98c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "category"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "first_name"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "last_name"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "reason"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "subcategoryId" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_priority_enum" AS ENUM('urgent', 'high', 'low', 'medium')`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "priority" "public"."tickets_priority_enum" NOT NULL DEFAULT 'low'`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "subject" character varying`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "refundReason" character varying`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_76c135c22640a1d7e00319ede81" FOREIGN KEY ("subcategoryId") REFERENCES "subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "passengers" ADD CONSTRAINT "FK_2ef5b58e50636a1cfa6e5b3cfdd" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passengers" DROP CONSTRAINT "FK_2ef5b58e50636a1cfa6e5b3cfdd"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_76c135c22640a1d7e00319ede81"`);
        await queryRunner.query(`ALTER TABLE "tickets" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "refundReason"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "subcategoryId"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "reason" character varying`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "last_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "first_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "category" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "passengers"`);
    }

}
