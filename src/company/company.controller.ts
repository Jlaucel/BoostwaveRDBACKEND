import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Post()
	create(@Body() body) {
		return this.companyService.create(body);
	}

	@Get()
	findAll() {
		return this.companyService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.companyService.findOne(Number(id));
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() body) {
		return this.companyService.update(Number(id), body);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.companyService.remove(Number(id));
	}
}
