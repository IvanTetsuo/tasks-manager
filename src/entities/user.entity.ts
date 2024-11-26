import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { Exclude } from 'class-transformer';

enum UserRole {
  EMPLOYEE = 'Employee',
  ADMIN = 'Admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id!: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: 'varchar', length: 100, unique: true })
  @Exclude()
  email!: string;

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

  @ApiProperty({ example: 'Employee', description: 'Employee или Admin' })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.EMPLOYEE })
  role!: UserRole;

  @ManyToMany(() => Project, (project) => project.participants)
  assignedProjects: Project[]; // Проекты, в которых пользователь участвует

  @ManyToMany(() => Task, (task) => task.participants)
  assignedTasks: Task[]; // Задания, в которых пользователь участвует

  @OneToMany(() => Project, (project) => project.user, { cascade: ['soft-remove'] })
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user, { cascade: ['soft-remove'] })
  tasks: Task[];
}

// вместо cascade true сделать soft-delete