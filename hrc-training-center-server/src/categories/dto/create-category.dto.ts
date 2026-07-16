import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({message: 'Tên danh mục phải là chuỗi'})
    @IsNotEmpty({message: 'Tên danh mục không được để trống'})
    name!: string;
    
    @IsString({message: 'Mô tả danh mục phải là chuỗi'})
    description?: string
}
