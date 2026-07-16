import { Gender } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  pID?: string;

  @IsString()
  fullname!: string;

  @IsString()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  gender?: Gender;

  @IsDateString()
  @IsOptional()
  dob?: Date;

  @IsArray()
  @IsOptional()
  roles?: number[];
}
