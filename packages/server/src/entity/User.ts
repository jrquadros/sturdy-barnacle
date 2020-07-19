import {
  Entity,
  // PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid') id: string

  @Column('varchar', { length: 255 }) email: string
  @Column('')
  @BeforeInsert()
  addId() {
    this.id = uuidv4()
  }
}
