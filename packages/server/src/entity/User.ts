import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn('uuid') id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number
}
