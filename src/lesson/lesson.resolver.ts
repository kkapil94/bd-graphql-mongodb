import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonEntity } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}
  @Query((returns) => LessonType)
  lesson(@Args('id') id: string): Promise<LessonEntity> {
    return this.lessonService.getLessonById(id);
  }

  @Query((returns) => [LessonType])
  getAllLessons(): Promise<LessonEntity[]> {
    return this.lessonService.getAllLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<LessonEntity> {
    return this.lessonService.createLesson(createLessonInput);
  }
}
