import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlogTables1701000000000 implements MigrationInterface {
  name = "CreateBlogTables1701000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create blog_tag table
    await queryRunner.query(`
      CREATE TABLE "blog_tag" (
        "id" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_blog_tag" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_blog_tag_slug" ON "blog_tag" ("slug")
    `);

    // Create blog_post table
    await queryRunner.query(`
      CREATE TYPE "blog_post_status_enum" AS ENUM('draft', 'published', 'archived')
    `);

    await queryRunner.query(`
      CREATE TABLE "blog_post" (
        "id" character varying NOT NULL,
        "slug" character varying NOT NULL,
        "title" character varying NOT NULL,
        "excerpt" text,
        "body_markdown" text NOT NULL,
        "status" "blog_post_status_enum" NOT NULL DEFAULT 'draft',
        "published_at" TIMESTAMP WITH TIME ZONE,
        "author_id" character varying,
        "hero_image_url" character varying,
        "seo_title" character varying,
        "seo_description" text,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_blog_post" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_blog_post_slug" ON "blog_post" ("slug")
    `);

    // Create blog_post_tags join table
    await queryRunner.query(`
      CREATE TABLE "blog_post_tags" (
        "blog_post_id" character varying NOT NULL,
        "blog_tag_id" character varying NOT NULL,
        CONSTRAINT "PK_blog_post_tags" PRIMARY KEY ("blog_post_id", "blog_tag_id")
      )
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_blog_post_tags_post" ON "blog_post_tags" ("blog_post_id")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_blog_post_tags_tag" ON "blog_post_tags" ("blog_tag_id")
    `);

    // Add foreign keys
    await queryRunner.query(`
      ALTER TABLE "blog_post_tags"
      ADD CONSTRAINT "FK_blog_post_tags_post"
      FOREIGN KEY ("blog_post_id") REFERENCES "blog_post"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "blog_post_tags"
      ADD CONSTRAINT "FK_blog_post_tags_tag"
      FOREIGN KEY ("blog_tag_id") REFERENCES "blog_tag"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog_post_tags" DROP CONSTRAINT "FK_blog_post_tags_tag"`);
    await queryRunner.query(`ALTER TABLE "blog_post_tags" DROP CONSTRAINT "FK_blog_post_tags_post"`);
    await queryRunner.query(`DROP INDEX "IDX_blog_post_tags_tag"`);
    await queryRunner.query(`DROP INDEX "IDX_blog_post_tags_post"`);
    await queryRunner.query(`DROP TABLE "blog_post_tags"`);
    await queryRunner.query(`DROP INDEX "IDX_blog_post_slug"`);
    await queryRunner.query(`DROP TABLE "blog_post"`);
    await queryRunner.query(`DROP TYPE "blog_post_status_enum"`);
    await queryRunner.query(`DROP INDEX "IDX_blog_tag_slug"`);
    await queryRunner.query(`DROP TABLE "blog_tag"`);
  }
}
