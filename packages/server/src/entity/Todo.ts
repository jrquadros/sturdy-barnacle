import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { User } from './User'

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @IsNotEmpty()
  @Column('text')
  title: string

  @Column('text', { nullable: true })
  description: string

  @Column({ default: false })
  done: boolean

  @ManyToOne(() => User, (author: User) => author.todos, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: false,
  })
  author: User

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date
}
