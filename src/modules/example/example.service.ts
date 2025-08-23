import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Example } from '../../database/entities/example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private exampleRepository: Repository<Example>,
  ) {}

  create(createExampleDto: CreateExampleDto) {
    const example = this.exampleRepository.create(createExampleDto);
    return this.exampleRepository.save(example);
  }

  findAll() {
    return this.exampleRepository.find();
  }

  findOne(id: string) {
    return this.exampleRepository.findOneBy({ id });
  }

  async update(id: string, updateExampleDto: UpdateExampleDto) {
    await this.exampleRepository.update(id, updateExampleDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const example = await this.findOne(id);
    if (!example) {
      throw new Error('Example not found');
    }
    return this.exampleRepository.remove(example);
  }
}
