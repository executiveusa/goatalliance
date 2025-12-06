import { BeforeInsert, Column, Entity, Index } from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class BlogTag extends BaseEntity {
  @Column({ type: "varchar" })
  @Index({ unique: true })
  slug: string;

  @Column({ type: "varchar" })
  name: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "btag");
  }
}
