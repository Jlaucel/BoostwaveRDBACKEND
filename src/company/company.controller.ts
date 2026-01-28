import { Controller, Body, Param, Put, Post, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { BaseController } from '../common/controllers/base.controller';
import { CompanyService } from './company.service';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('Companies')
@Controller('company')
export class CompanyController extends BaseController<Company> {
	constructor(private readonly companyService: CompanyService) {
		super(companyService);
	}

	getEntityName(): string {
		return 'Company';
	}

	@Post()
	@ApiOperation({ summary: 'Create a new company' })
	@ApiBody({ type: CreateCompanyDto })
	async create(@Body() createDto: CreateCompanyDto): Promise<Company> {
		return this.service.create(createDto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a company' })
	@ApiBody({ type: UpdateCompanyDto })
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateDto: UpdateCompanyDto,
	): Promise<Company> {
		return this.service.update(id, updateDto);
	}
}
