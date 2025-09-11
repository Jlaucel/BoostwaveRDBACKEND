import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company.entity';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(Company)
		private companyRepository: Repository<Company>,
	) {}

	create(data: Partial<Company>) {
		const company = this.companyRepository.create(data);
		return this.companyRepository.save(company);
	}
	findAll() {
		return this.companyRepository.find();
	}

	findOne(id: number) {
		return this.companyRepository.findOne({ where: { id } });
	}

	update(id: number, data: Partial<Company>) {
		return this.companyRepository.update(id, data);
	}

	remove(id: number) {
		return this.companyRepository.delete(id);
	}
}
