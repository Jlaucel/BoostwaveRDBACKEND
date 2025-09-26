import { Repository } from 'typeorm';
import { User } from '../user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(username: string, password: string, email: string, companyId: number, accessToken: string): Promise<User>;
    findUserByUsername(username: string): Promise<User | undefined>;
}
