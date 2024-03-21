import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ type: 'int', default: 0 })
  version: number;

  @Column({ type: 'text', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
