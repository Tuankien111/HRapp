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
    return this.employeeService.create(createEmployeeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete()
  remove(@Body('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
