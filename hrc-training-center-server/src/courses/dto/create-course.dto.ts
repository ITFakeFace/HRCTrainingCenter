import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty({ message: 'Code khoá học không được để trống' })
  @IsString({ message: 'Code phải là chuỗi' })
  code!: string;

  @IsNotEmpty({ message: 'Tên khoá học không được để trống' })
  @IsString({ message: 'Tên khoá học phải là chuỗi' })
  name!: string;

  @IsString({ message: 'Mô tả khoá học phải là chuỗi' })
  description?: string;

  @IsNotEmpty({ message: 'Thời lượng khoá học không được để trống' })
  @IsString({ message: 'Thời lượng khoá học phải là chuỗi' })
  duration!: string;

  @IsString()
  coverImage?: string;

  @IsNotEmptyObject({}, { message: 'Mục tiêu khoá học không được để trống' })
  @IsObject()
  objectives!: any;

  @IsNotEmptyObject({}, { message: 'Đối tượng khoá học không được để trống' })
  @IsObject()
  audiences!: any;

  @IsNotEmptyObject({}, { message: 'Yêu cầu khoá học không được để trống' })
  @IsObject()
  requirements!: any;

  @IsNotEmptyObject({}, { message: 'Lịch học không được để trống' })
  @IsObject()
  schedule!: any;

  @IsNotEmptyObject(
    {},
    { message: 'Hình thức kiểm tra khoá học không được để trống' },
  )
  @IsObject()
  assessments!: any;

  @IsNotEmptyObject({}, { message: 'Tài liệu khoá học không được để trống' })
  @IsObject()
  materials!: any;

  @IsNotEmptyObject({}, { message: 'Nội dung khoá học không được để trống' })
  @IsObject()
  contents!: any;

  @IsNotEmptyObject({}, { message: 'Giảng viên không được để trống' })
  @IsObject()
  instructors!: any;

  @IsNumber({}, { message: 'Giá khoá học phải là số' })
  @IsDecimal({}, { message: 'Giá khoá học phải là số (thập phân)' })
  price!: number;

  @IsNumber({}, { message: 'Kích thước tối thiểu phải là số' })
  minSize!: number;

  @IsNumber({}, { message: 'Kích thước tối đa phải là số' })
  maxSize?: number;

  @IsArray({ message: 'Danh mục khoá học phải là mảng' })
  categories!: number[];
}
