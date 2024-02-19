import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LessonEntity } from './lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './lesson.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonRepository: Repository<LessonEntity>,
  ) {}

  async getLessonById(id: string): Promise<LessonEntity> {
    const lesson = await this.lessonRepository.findOneBy({ id });
    return lesson;
  }

  async getAllLessons(): Promise<LessonEntity[]> {
    return this.lessonRepository.find();
  }

  async createLesson(
    createLessonInput: CreateLessonInput,
  ): Promise<LessonEntity> {
    const { name, startDate, endDate } = createLessonInput;
    const lesson = this.lessonRepository.create({
      name,
      startDate,
      endDate,
      id: uuid(),
    });
    return this.lessonRepository.save(lesson);
  }
}
