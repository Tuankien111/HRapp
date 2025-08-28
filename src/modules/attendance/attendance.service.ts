import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attendance } from 'src/database/entities/attendance.entity';
import { Employee } from 'src/database/entities/employee.entity';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll() {
    try {
      return await this.attendanceRepository.find({
        relations: ['employee'], // load cả thông tin nhân viên
      });
    } catch (error) {
      throw new Error('Error fetching attendance records');
    }
  }

  async createAttendance(dto: CreateAttendanceDto) {
    try {
      // kiểm tra nhân viên có tồn tại không
      const employee = await this.employeeRepository.findOne({
        where: { employeeCode: dto.employeeCode },
      });

      if (!employee) {
        throw new NotFoundException(
          `Employee with code ${dto.employeeCode} not found`,
        );
      }

      const newAttendance = this.attendanceRepository.create({
        ...dto,
        employee,
      });

      return await this.attendanceRepository.save(newAttendance);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateAttendance(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    try {
      const attendance = await this.attendanceRepository.findOne({
        where: { attendanceId: id },
      });

      if (!attendance) {
        throw new NotFoundException(
          `Attendance record with id ${id} not found`,
        );
      }

      await this.attendanceRepository.update(id, updateAttendanceDto);
      return 'Update successful';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteAttendance(id: number) {
    try {
      const attendance = await this.attendanceRepository.findOne({
        where: { attendanceId: id },
      });

      if (!attendance) {
        throw new NotFoundException(
          `Attendance record with id ${id} not found`,
        );
      }

      await this.attendanceRepository.delete(id);
      return 'Delete successful';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
