
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: number;
  
  @Column({ unique: true })
  username: string;

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  accessToken: string;

  
}