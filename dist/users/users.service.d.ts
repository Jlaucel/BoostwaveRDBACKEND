import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Company } from '../company/company.entity';
export declare class UsersService {
    private usersRepository;
    private companyRepository;
    constructor(usersRepository: Repository<User>, companyRepository: Repository<Company>);
    createUser(username: string, firstName: string, lastName: string, phone: string, email: string, password: string, profilePictureUrl: string, companyId: string, accessToken: string): Promise<User>;
    findUserByUsername(username: string): Promise<User | undefined>;
}
