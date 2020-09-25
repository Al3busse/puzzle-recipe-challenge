import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Recipe } from "./Recipe";

@Entity({ name: "category" })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.category)
  recipes!: Recipe[];
}
