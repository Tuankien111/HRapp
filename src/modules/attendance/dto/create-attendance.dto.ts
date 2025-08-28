import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsString()
  employeeCode: string; // mã nhân viên (liên kết với Employee)

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  leaveType: string; // Loại phép (bệnh, thai sản, thường niên...)

  @IsNotEmpty()
  @IsDateString()
  dateStart: string; // Thời gian bắt đầu nghỉ

  @IsNotEmpty()
  @IsDateString()
  dateEnd: string; // Thời gian kết thúc nghỉ

  @IsNotEmpty()
  @IsNumber()
  @Min(0.5, { message: 'Số ngày nghỉ phải >= 0.5' })
  days: number; // Số ngày nghỉ (có thể là 0.5, 1, 2,...)

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string; // Ghi chú

  @IsOptional()
  @IsString()
  attachment?: string; // Link ảnh/file đính kèm
}
