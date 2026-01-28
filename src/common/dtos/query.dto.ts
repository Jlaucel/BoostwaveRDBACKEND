import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class QueryDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Search term for filtering results',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Sort field',
  })
  @IsOptional()
  @IsString()
  sortBy?: string;

  @ApiPropertyOptional({
    description: 'Sort order (ASC or DESC)',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({
    description: 'Additional filters as JSON object',
  })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  filters?: Record<string, any>;
}
