import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1702781871566 implements MigrationInterface {
    name = 'MyMigration1702781871566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL, "id_user" integer NOT NULL, "username" character varying NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "idProductId" uuid, CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stock" integer NOT NULL, "material" character varying NOT NULL, "categories" character varying NOT NULL DEFAULT '[]', "features" character varying DEFAULT '[]', "image_src" character varying NOT NULL DEFAULT '[]', "size" character varying NOT NULL DEFAULT '[]', "color" character varying NOT NULL DEFAULT '[]', "rating_average" integer DEFAULT '0', "rating_count" integer DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_4a1455d1349e4c0040689192642" FOREIGN KEY ("idProductId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_4a1455d1349e4c0040689192642"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
    }

}
