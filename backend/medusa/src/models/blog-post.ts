import { BeforeInsert, Column, Entity, Index, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { BlogTag } from "./blog-tag";

export enum BlogPostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

@Entity()
export class BlogPost extends BaseEntity {
  @Column({ type: "varchar" })
  @Index({ unique: true })
  slug: string;

  @Column({ type: "varchar" })
  title: string;

  @Column({ type: "text", nullable: true })
  excerpt: string | null;

  @Column({ type: "text" })
  body_markdown: string;

  @Column({
    type: "enum",
    enum: BlogPostStatus,
    default: BlogPostStatus.DRAFT,
  })
  status: BlogPostStatus;

  @Column({ type: "timestamp with time zone", nullable: true })
  published_at: Date | null;

  @Column({ type: "varchar", nullable: true })
  author_id: string | null;

  @Column({ type: "varchar", nullable: true })
  hero_image_url: string | null;

  @Column({ type: "varchar", nullable: true })
  seo_title: string | null;

  @Column({ type: "text", nullable: true })
  seo_description: string | null;

  @ManyToMany(() => BlogTag, { cascade: true })
  @JoinTable({
    name: "blog_post_tags",
    joinColumn: {
      name: "blog_post_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "blog_tag_id",
      referencedColumnName: "id",
    },
  })
  tags: BlogTag[];

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "bpost");
  }
}
