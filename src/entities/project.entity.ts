import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id!: number;

  @ApiProperty({ example: 'Новый список задач', description: 'Название проекта' })
  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @ApiProperty({ example: 'Работа', description: 'Поле для описания доски' })
  @Column({ type: 'varchar', length: 100 })
  description!: string;

  @ApiProperty({
    example: '00.00.0000 / 00:00',
    description: 'Дата и время создания',
  })
  @Column({ type: 'timestamptz', default: 'NOW()' })
  dateOfCreation!: Date;

  @ApiProperty({
    example: '[1, 2, 3]',
    description: 'Список пользователей, участвующих в проекте',
  })
  @ManyToMany(() => User, (user) => user.assignedProjects)
  @JoinTable() // Связывает текущую сущность с User через промежуточную таблицу
  participants: User[]; // Список участников проекта

  @ManyToOne(() => User, (user) => user.projects, { cascade: true })
  user: User; // author: User;

  @OneToMany(() => Task, (task) => task.project, { cascade: true })
  tasks: Task[];
}
