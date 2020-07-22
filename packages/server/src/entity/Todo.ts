import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
  getRepository,
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { User } from './User'

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @IsNotEmpty()
  @Column('text')
  title: string

  @Column('text')
  description: string

  @Column({ default: false })
  done: boolean

  @ManyToMany((_) => User, (user: User) => user.todos, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @IsNotEmpty()
  createdBy: User

  @CreateDateColumn()
  createdAt: Date
}

export const getTodoRepository = () => getRepository(Todo)
