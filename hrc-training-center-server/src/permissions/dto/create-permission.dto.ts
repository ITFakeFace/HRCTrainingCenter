import { IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  action!: string;

  @IsString()
  resource!: string;
}
