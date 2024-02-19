import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @MinLength(1)
  @IsNotEmpty()
  firstName: string;

  @Field()
  @MinLength(1)
  @IsNotEmpty()
  lastName: string;
}
