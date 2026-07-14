import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Shortname phải là chuỗi' })
  @IsNotEmpty({ message: 'Shortname không được để trống' })
  shortname!: string;

  @IsString({ message: 'Fullname phải là chuỗi' })
  @IsNotEmpty({ message: 'Fullname không được để trống' })
  fullname!: string;

  @IsNumber({}, { message: 'Level phải là số' })
  @IsNotEmpty({ message: 'Level không được để trống' })
  level!: number;

  @IsNumber({}, { each: true, message: 'Roles phải là mảng số' })
  roles!: number[];

  @IsNumber({}, { each: true, message: 'Permissions phải là mảng số' })
  permissions!: number[];
}
