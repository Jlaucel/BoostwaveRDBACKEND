import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  Repository,
  FindOptionsWhere,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { PaginatedResponseDto, PaginationDto } from '../dtos/pagination.dto';
import { QueryDto } from '../dtos/query.dto';

@Injectable()
export abstract class BaseService<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  abstract getEntity(): new () => T;

  /**
   * Find all entities with pagination and filtering
   */
  async findAll(
    queryDto?: QueryDto,
  ): Promise<PaginatedResponseDto<T> | T[]> {
    const { page, limit, search, sortBy, sortOrder, filters } = queryDto || {};

    // If no pagination params, return all
    if (!page && !limit) {
      const options: FindManyOptions<T> = {};
      if (sortBy) {
        options.order = { [sortBy]: sortOrder || 'DESC' } as any;
      }
      if (filters) {
        options.where = filters as FindOptionsWhere<T>;
      }
      return this.repository.find(options);
    }

    const skip = ((page || 1) - 1) * (limit || 10);
    const take = limit || 10;

    const queryBuilder = this.repository.createQueryBuilder('entity');

    // Apply search if provided
    if (search) {
      this.applySearch(queryBuilder, search);
    }

    // Apply filters
    if (filters) {
      Object.keys(filters).forEach((key) => {
        queryBuilder.andWhere(`entity.${key} = :${key}`, {
          [key]: filters[key],
        });
      });
    }

    // Apply sorting
    if (sortBy) {
      queryBuilder.orderBy(`entity.${sortBy}`, sortOrder || 'DESC');
    } else {
      queryBuilder.orderBy('entity.createdAt', 'DESC');
    }

    // Apply soft delete filter (only non-deleted)
    queryBuilder.andWhere('entity.deletedAt IS NULL');

    const [data, total] = await queryBuilder
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return new PaginatedResponseDto(data, total, page || 1, take);
  }

  /**
   * Find one entity by ID or conditions
   */
  async findOne(idOrConditions: number | FindOptionsWhere<T>): Promise<T> {
    let entity: T | null;

    if (typeof idOrConditions === 'number') {
      entity = await this.repository.findOne({
        where: { id: idOrConditions } as FindOptionsWhere<T>,
      });
    } else {
      entity = await this.repository.findOne({
        where: idOrConditions,
      });
    }

    if (!entity || entity.deletedAt) {
      throw new NotFoundException(
        `${this.getEntity().name} not found`,
      );
    }

    return entity;
  }

  /**
   * Create a new entity
   */
  async create(createDto: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(createDto);
      return await this.repository.save(entity);
    } catch (error) {
      throw new BadRequestException(
        `Failed to create ${this.getEntity().name}: ${error.message}`,
      );
    }
  }

  /**
   * Update an entity
   */
  async update(id: number, updateDto: DeepPartial<T>): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return await this.repository.save(entity);
  }

  /**
   * Soft delete an entity
   */
  async softDelete(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.softRemove(entity);
  }

  /**
   * Hard delete an entity (permanent)
   */
  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  /**
   * Restore a soft-deleted entity
   */
  async restore(id: number): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      withDeleted: true,
    });

    if (!entity) {
      throw new NotFoundException(
        `${this.getEntity().name} not found`,
      );
    }

    if (!entity.deletedAt) {
      throw new BadRequestException(
        `${this.getEntity().name} is not deleted`,
      );
    }

    entity.deletedAt = null;
    return await this.repository.save(entity);
  }

  /**
   * Override this method in child services to implement custom search logic
   */
  protected applySearch(queryBuilder: any, search: string): void {
    // Default implementation: search in common fields
    // Override in child services for specific search logic
    queryBuilder.andWhere(
      '(entity.id LIKE :search OR entity.id = :searchId)',
      {
        search: `%${search}%`,
        searchId: isNaN(Number(search)) ? -1 : Number(search),
      },
    );
  }
}
