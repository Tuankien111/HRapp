import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from 'src/database/entities/attendance.entity';
import { Employee } from 'src/database/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance,Employee])],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
