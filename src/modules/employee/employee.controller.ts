import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';


@Controller('employee')
@UsePipes(new ValidationPipe({ transform: true }))
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto){
    try {
      return this.employeeService.create(createEmployeeDto);
    } catch (error) {
      return { error: error.message };
    }
  }

  
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.employeeService.findOne(+id);
    } catch (error) {
      return { error: error.message };
    }
  }
  
  @Patch()
  update(@Body() updateEmployeeDto: UpdateEmployeeDto) {
    try {
      return this.employeeService.update(updateEmployeeDto);
    } catch (error) {
      return { error: error.message };
    }
  }
  
  @Get('/filter/:code')
  findOneByCode(@Param('code') code: string) {
    try {
      return this.employeeService.findByEmployeeCode(code);
    } catch (error) {
      return { error: error.message };
    }
  }
  @Delete()
  remove(@Body('id') id: string) {
    try {
      return this.employeeService.remove(+id);
    } catch (error) {
      return { error: error.message };
    }
  }
}
