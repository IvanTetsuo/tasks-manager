import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id!: number;

  @ApiProperty({ example: 'login', description: 'Логин' })
  @Column({ type: 'varchar', length: 100, unique: true })
  login!: string;

  @ApiProperty({ example: 'not12345', description: 'Пароль' })
  @Column({ type: 'varchar', length: 100 })
  @Exclude()
  password!: string;

  @ApiProperty({ example: 'Ivan', description: 'Имя' })
  @Column({ type: 'varchar', length: 20 })
  name!: string;

  @ApiProperty({ example: 'Ivanov', description: 'Фамилия' })
  @Column({ type: 'varchar', length: 20 })
  surname!: string;

  @ManyToMany(() => Project, (project) => project.participants)
  assignedProjects: Project[]; // Проекты, в которых пользователь участвует

  @OneToMany(() => Project, (project) => project.user, { cascade: true })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user, { cascade: true })
  tasks: Task[];
}
