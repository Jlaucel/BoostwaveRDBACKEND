# Generic Resource Pattern - Guía de Uso

Este directorio contiene la arquitectura base para acelerar el desarrollo de nuevos módulos.

## Estructura

- `entities/base.entity.ts` - Entidad base con campos comunes (id, createdAt, updatedAt, deletedAt)
- `services/base.service.ts` - Servicio genérico con CRUD completo
- `controllers/base.controller.ts` - Controlador genérico con endpoints REST automáticos
- `dtos/` - DTOs genéricos para paginación y queries

## Ejemplo de Uso

### 1. Crear la Entidad

```typescript
import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column('decimal')
  price: number;
}
```

### 2. Crear el Servicio

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common/services/base.service';
import { Product } from './product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product)
    protected readonly repository: Repository<Product>,
  ) {
    super(repository);
  }

  getEntity(): new () => Product {
    return Product;
  }

  // Opcional: Personalizar búsqueda
  protected applySearch(queryBuilder: any, search: string): void {
    queryBuilder.andWhere(
      '(entity.name LIKE :search OR entity.price = :searchPrice)',
      {
        search: `%${search}%`,
        searchPrice: isNaN(Number(search)) ? -1 : Number(search),
      },
    );
  }
}
```

### 3. Crear el Controlador

```typescript
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseController } from '../common/controllers/base.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductController extends BaseController<Product> {
  constructor(private readonly productService: ProductService) {
    super(productService);
  }

  getEntityName(): string {
    return 'Product';
  }
}
```

### 4. Configurar el Módulo

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
```

## Endpoints Automáticos

Al extender `BaseController`, obtienes automáticamente:

- `GET /resource` - Listar todos (con paginación, búsqueda, filtros)
- `GET /resource/:id` - Obtener por ID
- `POST /resource` - Crear nuevo
- `PUT /resource/:id` - Actualizar
- `DELETE /resource/:id` - Soft delete
- `POST /resource/:id/restore` - Restaurar soft-deleted

## Query Parameters

- `page` - Número de página (default: 1)
- `limit` - Items por página (default: 10, max: 100)
- `search` - Búsqueda de texto
- `sortBy` - Campo para ordenar
- `sortOrder` - ASC o DESC (default: DESC)
- `filters` - Objeto JSON con filtros adicionales

## Ejemplo de Request

```
GET /company?page=1&limit=10&search=test&sortBy=name&sortOrder=ASC
```
