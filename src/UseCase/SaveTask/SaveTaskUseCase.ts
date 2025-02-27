import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { UseCase } from '../../index';
import SaveTaskDto from './SaveTaskDto';
import TaskRepository from '../../Repositories/TaskRepository';

@Injectable()
export default class SaveTaskUseCase implements UseCase<Promise<Task>, [SaveTaskDto]> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async handle(dto: SaveTaskDto): Promise<Task> {
    // Vérifie que le nom de la tâche est valide
    if (!dto.name || dto.name.trim() === '') {
      throw new BadRequestException('Task name is required');
    }

    // Sauvegarde la tâche en base de données
    return this.taskRepository.save(dto);
  }
}
