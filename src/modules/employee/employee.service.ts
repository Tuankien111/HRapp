import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/database/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor ( 
    @InjectRepository(Employee)
      private employeeRepository: Repository<Employee>,) {
  }
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const newEmployee = this.employeeRepository.create(createEmployeeDto);
      return await this.employeeRepository.save(newEmployee);
    } catch (error) {
      throw new Error(`Failed to create employee: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const employee = await this.employeeRepository.findOneBy({ id });
      if (!employee) {
        throw new Error(`Employee with id ${id} not found`);
      }
      return employee;
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const result = await this.employeeRepository.update(id, updateEmployeeDto);
      if (result.affected === 0) {
        throw new Error(`Employee with id ${id} not found`);
      }
      return await this.findOne(id);
    } catch (error) {
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      const employee = await this.findOne(id);
      if (!employee) {
        throw new Error(`Employee with id ${id} not found`);
      }
      return await this.employeeRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to remove employee: ${error.message}`);
    }
  }
}
