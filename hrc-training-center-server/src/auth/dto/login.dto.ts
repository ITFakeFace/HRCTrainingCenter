import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email hoặc Số điện thoại phải là một chuỗi.' })
  @IsNotEmpty({ message: 'Email hoặc Số điện thoại không được để trống.' })
  identifier!: string;

  @IsString({ message: 'Mật khẩu phải là một chuỗi.' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống.' })
  password!: string;
}
