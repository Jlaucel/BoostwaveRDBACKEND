import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { User } from '../users/user.entity';

@Entity()
export class Company extends BaseEntity {
  @Column({ nullable: true, unique: true })
  rnc: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, name: 'company_name' })
  companyName: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  logoUrl: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
