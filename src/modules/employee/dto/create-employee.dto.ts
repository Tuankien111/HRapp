import { 
  IsString, IsNotEmpty, IsIn, IsDateString, Length, IsOptional, 
  Matches, Validate 
} from 'class-validator';
import { Transform } from 'class-transformer';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ValidationMessage } from 'src/global/constants/validation-message';
import { EmployeeGender } from 'src/global/constants/globalEnum';
import { EmployeeStatus } from 'src/global/constants/globalEnum';
import { generate } from 'rxjs';

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
          return ValidationMessage.BIRTHDAY.INVALID;
        },
      },
    });
  };
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: ValidationMessage.EMPLOYEE_CODE.REQUIRE })
  @Matches(/^TK025\d{2}$/, { message: ValidationMessage.EMPLOYEE_CODE.INVALID })
  employeeCode: string; // Mã nhân viên

  @IsString()
  @IsNotEmpty({ message: ValidationMessage.FULLNAME.REQUIRE })
  @Matches(/^[A-ZÀ-Ý][a-zA-ZÀ-ỹ\s]+$/, { message: ValidationMessage.FULLNAME.INVALID })
  fullName: string; // Họ tên

  @IsString()
  @IsIn([EmployeeGender.MALE, EmployeeGender.FEMALE], { message: ValidationMessage.GENDER.INVALID })
  gender: EmployeeGender; // Giới tính

  @IsDateString()
  @IsAdult()
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
  @Matches(/^[0-9]{10,11}$/, { message: ValidationMessage.PHONE.INVALID })
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
  @IsIn([EmployeeStatus.PROBATION, EmployeeStatus.OFFICIAL], { message: ValidationMessage.STATUS.INVALID })
  status?: EmployeeStatus;
}
