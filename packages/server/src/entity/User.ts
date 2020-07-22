import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Todo } from './Todo'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column('varchar', { length: 255, unique: true })
  email: string

  @Column('text')
  name: string

  @OneToMany((_) => Todo, (todo: Todo) => todo.createdBy)
  todos: Todo[]
}
