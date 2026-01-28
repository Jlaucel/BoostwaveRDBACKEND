import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username (must be unique)' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'User first name' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'User email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Company ID' })
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiPropertyOptional({ description: 'User phone' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Profile picture URL' })
  @IsOptional()
  @IsString()
  profilePictureUrl?: string;

  @ApiPropertyOptional({ description: 'Access token' })
  @IsOptional()
  @IsString()
  accessToken?: string;

  @ApiPropertyOptional({ description: 'Meta Ads Account ID (e.g., act_1245616320222664)' })
  @IsOptional()
  @IsString()
  metaAdAccountId?: string;
}
