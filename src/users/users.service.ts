import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createUser(username: string, password: string, email: string, companyId: number, accessToken: string): Promise<User> {

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.usersRepository.create({ username, password: hashedPassword, email, companyId, accessToken});
        return this.usersRepository.save(user);

    }

    async findUserByUsername(username: string): Promise<User | undefined> {
       const userfind = await this.usersRepository.findOne({ where: { username }, relations: ['company'] });
       return userfind || undefined;

   }

}
