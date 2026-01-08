
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from '../company/company.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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