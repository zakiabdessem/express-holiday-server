import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1735084841672 implements MigrationInterface {
    name = 'Migrations1735084841672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "last_reply" TIMESTAMP, "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'open', "categoryId" integer NOT NULL, "subcategoryId" integer NOT NULL, "description" character varying, "priority" "public"."tickets_priority_enum" NOT NULL DEFAULT 'low', "subject" character varying, "refundReason" character varying, "pnr" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "passengers" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "ticketNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ticketId" integer, CONSTRAINT "PK_9863c72acd866e4529f65c6c98c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategories" ("id" SERIAL NOT NULL, "nameFr" character varying NOT NULL, "nameEn" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "passengers" ADD CONSTRAINT "FK_2ef5b58e50636a1cfa6e5b3cfdd" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_d1fe096726c3c5b8a500950e448" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_d1fe096726c3c5b8a500950e448"`);
        await queryRunner.query(`ALTER TABLE "passengers" DROP CONSTRAINT "FK_2ef5b58e50636a1cfa6e5b3cfdd"`);
        await queryRunner.query(`DROP TABLE "subcategories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "passengers"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
    }

}
