import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/services/base.service';
import { Company } from './company.entity';

@Injectable()
export class CompanyService extends BaseService<Company> {
	constructor(
		@InjectRepository(Company)
		protected readonly repository: Repository<Company>,
	) {
		super(repository);
	}

	getEntity(): new () => Company {
		return Company;
	}

	/**
	 * Override search to include name and rnc fields
	 */
	protected applySearch(queryBuilder: any, search: string): void {
		queryBuilder.andWhere(
			'(entity.name LIKE :search OR entity.rnc LIKE :search OR entity.id = :searchId)',
			{
				search: `%${search}%`,
				searchId: isNaN(Number(search)) ? -1 : Number(search),
			},
		);
	}
}
