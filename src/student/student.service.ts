import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { CreateStudentInput } from './student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  getAllStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.find();
  }

  getStudentById(id: string): Promise<StudentEntity> {
    return this.studentRepository.findOneBy({ id });
  }

  createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      firstName,
      lastName,
      id: uuid(),
    });
    return this.studentRepository.save(student);
  }
}
