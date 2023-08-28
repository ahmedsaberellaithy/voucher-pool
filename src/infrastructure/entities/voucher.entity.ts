import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Customer } from './customer.entity';
import { Offer } from './offer.entity';

@Entity()
export class Voucher {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { length: 8, unique: true })
  code: string;

  //linkage data
  @ManyToOne(() => Customer)
  customer: Customer;

  @ManyToOne(() => Offer)
  offer: Offer;

  //is it used
  @Column('boolean', { default: false })
  is_used: boolean;

  @Column({ type: 'timestamp', nullable: true })
  used_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiration_date: Date;

  @CreateDateColumn({ name: 'createdAt' })
  created_date: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updated_date: Date;
}
