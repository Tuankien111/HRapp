import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional, Min, MaxLength,Max } from 'class-validator';
import {ValidationMessage} from '../../../global/constants/validation-message';
export class CreateAttendanceDto {
  @IsNotEmpty()
  @IsString()
  employeeCode: string; 

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  leaveType: string; 

  @IsNotEmpty()
  @IsDateString()
  dateStart: string;

  @IsNotEmpty()
  @IsDateString()
  dateEnd: string; 

  @IsNotEmpty()
  @IsNumber()
  @Min(0.5, { message: ValidationMessage.ATTENDANCE_DAYS.MIN })
  @Max(3, {message: ValidationMessage.ATTENDANCE_DAYS.MAX})
  days: number; 

  @IsOptional()
  @IsString()
  @MaxLength(255)
  note?: string; 

  @IsOptional()
  @IsString()
  attachment?: string; 
}
