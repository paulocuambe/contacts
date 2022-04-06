import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';

@Entity()
export class ContactLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contact, (contact) => contact.contactLogs)
  contact: Contact;

  @Column()
  log_type: string;

  @Column()
  description: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  deleted: boolean;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @CreateDateColumn()
  generated_at: string;
}
