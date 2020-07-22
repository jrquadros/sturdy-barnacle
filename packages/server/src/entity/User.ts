import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column('varchar', { length: 255, unique: true })
  email: string

  @Column('text')
  name: string
}
