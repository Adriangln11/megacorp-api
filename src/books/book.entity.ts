import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ type: 'datetime', nullable: true })
  released: Date;

  @Column({ default: '0' })
  price: number;

  @Column({ default: true })
  available: boolean;
}
