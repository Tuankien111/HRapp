import { 
  IsString, IsNotEmpty, IsIn, IsDateString, Length, IsOptional, 
  Matches, Validate 
} from 'class-validator';
import { Transform } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

// Custom validator: tuổi >= 18
function IsAdult(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAdult',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          if (!value) return false;
          const birthDate = new Date(value); // => Lấy dữ liệu từ request
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          return age >= 18;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Nhân viên phải từ 18 tuổi trở lên';
        },
      },
    });
  };
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^TK025\d{2}$/, { message: 'Mã nhân viên phải có dạng TK025xx (xx là số)' })
  employeeCode: string; // Mã nhân viên

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-ZÀ-Ý][a-zA-ZÀ-ỹ\s]+$/, { message: 'Họ tên không hợp lệ (chữ cái đầu viết hoa, không chứa số/ký tự đặc biệt)' })
  fullName: string; // Họ tên

  @IsString()
  @IsIn(['Nam', 'Nữ'], { message: 'Giới tính chỉ được là Nam hoặc Nữ' })
  gender: 'Nam' | 'Nữ'; // Giới tính

  @IsDateString()
  @IsAdult({ message: 'Nhân viên phải đủ 18 tuổi trở lên' })
  birthDate: Date; // Ngày sinh

  @IsString()
  @Length(9, 20)
  citizenId: string; // CCCD

  @IsOptional()
  @IsDateString()
  citizenIssuedDate?: Date; // Ngày cấp

  @IsString()
  nationality: string; // Quốc tịch

  @IsString()
  address: string; // Địa chỉ

  @IsString()
  @Matches(/^[0-9]{10,11}$/, { message: 'Số điện thoại phải là 10-11 chữ số' })
  phone: string; // Số điện thoại

  @IsDateString()
  startDate: Date; // Ngày vào làm

  @IsString()
  department: string; // Bộ phận

  @IsString()
  position: string; // Chức vụ

  @IsString()
  contractType: string; // Loại hợp đồng

  @IsOptional()
  @IsDateString()
  contractSignedDate?: Date; // Ngày ký hợp đồng

  @IsOptional()
  @IsDateString()
  contractEndDate?: Date; // Ngày hết hạn hợp đồng

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value ?? 'Thử việc') // nếu không truyền thì mặc định "Thử việc"
  status?: 'Thử việc' | 'Chính thức';
}
