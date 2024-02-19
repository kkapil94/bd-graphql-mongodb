import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { StudentEntity } from './student.entity';
import { CreateStudentInput } from './student.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  getAllStudents(): Promise<StudentEntity[]> {
    return this.studentService.getAllStudents();
  }

  @Query((returns) => StudentType)
  getStudentById(@Args('id') id: string): Promise<StudentEntity> {
    return this.studentService.getStudentById(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    return this.studentService.createStudent(createStudentInput);
  }
}
