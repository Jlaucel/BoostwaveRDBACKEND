import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Company } from '../company/company.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,

    ) {}

    async createUser(
        username: string,
        firstName: string,
        lastName: string, 
        phone: string,
        email: string, 
        password: string,        
        profilePictureUrl: string,
        companyId: string,        
        accessToken: string): Promise<User> {
        const company = await this.companyRepository.findOne({ where: { id: Number(companyId) } });
        if (!company) {
            throw new NotFoundException(`Company with ID ${companyId} not found`);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create(
            { 
                username, 
                firstName, 
                lastName, 
                phone, 
                password: hashedPassword, 
                email, 
                profilePictureUrl, 
                companyId: Number(companyId),
                accessToken
            });
        return this.usersRepository.save(user);

    }

    async findUserByUsername(username: string): Promise<User | undefined> {
       const userfind = await this.usersRepository.findOne({ where: { username }, relations: ['company'] });
       return userfind || undefined;

   }

}
