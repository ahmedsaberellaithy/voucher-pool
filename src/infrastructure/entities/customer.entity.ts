import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @CreateDateColumn({ name: 'createdAt' })
  created_date: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updated_date: Date;
}
