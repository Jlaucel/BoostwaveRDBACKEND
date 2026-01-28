import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/services/base.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { Company } from '../company/company.entity';

@Injectable()
export class UsersService extends BaseService<User> {
    constructor(
        @InjectRepository(User)
        protected readonly repository: Repository<User>,
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) {
        super(repository);
    }

    getEntity(): new () => User {
        return User;
    }

    /**
     * Override create to handle password hashing and company validation
     */
    async create(createDto: any): Promise<User> {
        // Validate company exists
        if (createDto.companyId) {
            const company = await this.companyRepository.findOne({ 
                where: { id: createDto.companyId } 
            });
            if (!company) {
                throw new NotFoundException(`Company with ID ${createDto.companyId} not found`);
            }
        }

        // Hash password if provided
        if (createDto.password) {
            createDto.password = await bcrypt.hash(createDto.password, 10);
        }

        // Check if username already exists
        if (createDto.username) {
            const existingUser = await this.repository.findOne({ 
                where: { username: createDto.username } 
            });
            if (existingUser) {
                throw new BadRequestException('Username already exists');
            }
        }

        return super.create(createDto);
    }

    /**
     * Override update to handle password hashing
     */
    async update(id: number, updateDto: any): Promise<User> {
        // Hash password if provided
        if (updateDto.password) {
            updateDto.password = await bcrypt.hash(updateDto.password, 10);
        }

        // Validate company if companyId is being updated
        if (updateDto.companyId) {
            const company = await this.companyRepository.findOne({ 
                where: { id: updateDto.companyId } 
            });
            if (!company) {
                throw new NotFoundException(`Company with ID ${updateDto.companyId} not found`);
            }
        }

        return super.update(id, updateDto);
    }

    /**
     * Find user by username (for authentication)
     */
    async findUserByUsername(username: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ 
            where: { username }, 
            relations: ['company'] 
        });
        return user || undefined;
    }

    /**
     * Override search to include username, email, firstName, lastName
     */
    protected applySearch(queryBuilder: any, search: string): void {
        queryBuilder.andWhere(
            '(entity.username LIKE :search OR entity.email LIKE :search OR entity.firstName LIKE :search OR entity.lastName LIKE :search OR entity.id = :searchId)',
            {
                search: `%${search}%`,
                searchId: isNaN(Number(search)) ? -1 : Number(search),
            },
        );
    }

}
