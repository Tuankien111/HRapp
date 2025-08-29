import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/database/entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  // POST | Create new Employee
  async create(createEmployeeDto: CreateEmployeeDto) {
    const employeeCode = createEmployeeDto.employeeCode;
    if (await this.findByEmployeeCode(employeeCode)) {
      return { error: `Employee with code ${employeeCode} already exists` };
    }
    try {
      const newEmployee = this.employeeRepository.create(createEmployeeDto);
      return await this.employeeRepository.save(newEmployee);
    } catch (error) {
      throw new Error(`Failed to create employee: ${error.message}`);
    }
  }
  // GET | Find all Employees
  async findAll() {
    try {
      return await this.employeeRepository.find();
    } catch (error) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
  }
  // GET | Find Employee by ID
  async findOne(id: number) {
    try {
      const employee = await this.employeeRepository.findOneBy({ id });
      if (!employee) {
        return { error: `Employee with id ${id} not found` };
      }
      return employee;
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }
  // PATCH | Update Employee
  async update(updateEmployeeDto: UpdateEmployeeDto) {
    const { id } = updateEmployeeDto;
    try {
      const result = await this.employeeRepository.update(
        id,
        updateEmployeeDto,
      );
      if (result.affected === 0) {
        return { error: `Employee with id ${id} not found` };
      }
      return await this.findOne(id);
    } catch (error) {
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  }
  // DELETE | Remove Employee
  async remove(id: number) {
    try {
      const employee = await this.findOne(id);
      if (!employee) {
        return { error: `Employee with id ${id} not found` };
      }
      return await this.employeeRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to remove employee: ${error.message}`);
    }
  }
  // GET | Find Employee by Code
  async findByEmployeeCode(employeeCode: string) {
    try {
      const employee = await this.employeeRepository.findOneBy({ employeeCode });
      if (!employee) {
        return { error: `Employee with code ${employeeCode} not found` };
      }
      return employee;
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }
}
