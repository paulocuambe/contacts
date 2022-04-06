import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactLog } from './contact-log.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ContactLog, (log) => log.contact)
  contactLogs: ContactLog[];

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
