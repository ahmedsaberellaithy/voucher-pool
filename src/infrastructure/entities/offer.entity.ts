import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('decimal')
  discount_percentage: number;

  @Column('varchar', { length: 255, unique: true })
  name: string;

  @CreateDateColumn({ name: 'createdAt' })
  created_date: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updated_date: Date;
}
