import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma, Task } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async delete(id: number): Promise<Task> {
    console.log('Task deleted with id:', id);
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async save(data: Partial<Task>): Promise<Task> {
    if (!data.id) {
      // Création d'une nouvelle tâche
      console.log('Creating task with data:', data);
      return this.prisma.task.create({
        data: {
          name: data.name ?? '', // Assure que le champ `name` est défini
        },
      });
    } else {
      // Vérifie si la tâche existe avant de tenter la mise à jour
      const existingTask = await this.prisma.task.findUnique({ where: { id: data.id } });

      if (!existingTask) {
        throw new Error(`Task with ID ${data.id} not found`);
      }

      // Mise à jour de la tâche
      console.log('Updating task with data:', data);
      return this.prisma.task.update({
        where: { id: data.id },
        data: {
          name: data.name ?? existingTask.name, // Assure que le champ `name` est défini
        },
      });
    }
  }
}
