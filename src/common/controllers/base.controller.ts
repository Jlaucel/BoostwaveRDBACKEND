import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { DeepPartial } from 'typeorm';
import { BaseService } from '../services/base.service';
import { BaseEntity } from '../entities/base.entity';
import { QueryDto } from '../dtos/query.dto';
import { PaginatedResponseDto } from '../dtos/pagination.dto';

export abstract class BaseController<T extends BaseEntity> {
  constructor(protected readonly service: BaseService<T>) {}

  abstract getEntityName(): string;

  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all entities' })
  @ApiResponse({
    status: 200,
    description: 'List of entities',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortBy', required: false, type: String })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['ASC', 'DESC'] })
  async findAll(@Query() queryDto: QueryDto): Promise<PaginatedResponseDto<T> | T[]> {
    return this.service.findAll(queryDto);
  }

  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get an entity by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The entity has been found',
  })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new entity' })
  @ApiBody({ description: 'Data to create entity' })
  @ApiResponse({
    status: 201,
    description: 'The entity has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createDto: DeepPartial<T>): Promise<T> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update an entity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ description: 'Data to update entity' })
  @ApiResponse({
    status: 200,
    description: 'The entity has been successfully updated',
  })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: DeepPartial<T>,
  ): Promise<T> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Soft delete an entity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
    description: 'The entity has been successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.softDelete(id);
  }

  @Post(':id/restore')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restore a soft-deleted entity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The entity has been successfully restored',
  })
  @ApiResponse({ status: 404, description: 'Entity not found' })
  async restore(@Param('id', ParseIntPipe) id: number): Promise<T> {
    return this.service.restore(id);
  }
}
