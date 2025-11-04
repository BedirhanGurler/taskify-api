import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'FullName' })
  fullName: string;

  @Column({ name: 'Email', unique: true })
  email: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'IsActive', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'DateCreated' })
  dateCreated: Date;

  @UpdateDateColumn({ name: 'DateModified' })
  dateModified: Date;
}
