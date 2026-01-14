import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';
import { Company } from '../company/company.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ unique: true })
  username: string;
   @Column()
  firstName: string;

  @Column()
  companyId: number;
  
  @Column()
  lastName: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  profilePictureUrl: string; // URL de la foto de perfil del usuario

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'companyId' })
  company: Company;

 
  
}