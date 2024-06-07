const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initDb1717581929530 {
    name = 'initDb1717581929530'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "keyword_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "created_by" character varying,
                "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "modified_by" character varying,
                "keyword" character varying(255) NOT NULL,
                "links" character varying,
                CONSTRAINT "UQ_40b8bfd95ddea100f66326bad60" UNIQUE ("keyword"),
                CONSTRAINT "PK_92982d6f9e6505ac0a66a88f42f" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "keyword_entity"
        `);
    }
}
