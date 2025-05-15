import { AbstractEntity } from "@/commons"
import { Column, Entity } from "typeorm"

@Entity("users")
export class User extends AbstractEntity {
  @Column({
    name: "first_name",
    type: "varchar",
  })
  firstName: string
}
