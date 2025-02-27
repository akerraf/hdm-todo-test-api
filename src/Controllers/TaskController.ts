import { Controller, Get, Post, Patch, Delete, Body, Param, BadRequestException } from '@nestjs/common';

import DeleteTask from '../UseCase/DeleteTask/DeleteTask';
import GetAllTasksUseCase from '../UseCase/GetAllTasks/GetAllTasksUseCase';
import SaveTaskDto from '../UseCase/SaveTask/SaveTaskDto';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import UseCaseFactory from '../UseCase/UseCaseFactory';

@Controller()
export default class TaskController {
  SaveTaskUseCase: any;
  constructor(private readonly useCaseFactory: UseCaseFactory) {}

  @Get('/tasks')
  async getAll() {
    return (await this.useCaseFactory.create(GetAllTasksUseCase)).handle();
  }

  /*@Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
    //return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);

    const saveTaskUseCase = await this.useCaseFactory.create(SaveTaskUseCase);
    const result = await saveTaskUseCase.handle(dto);
    console.log('Task created with data:', result);
    return result;
  }

  @Post()
  async createTask(@Body() createTaskDto: SaveTaskDto, SaveTaskUseCase: SaveTaskUseCase) {
    //const newTask = await this.useCaseFactory.create(SaveTaskUseCase).handle(createTaskDto);
    //console.log('New task created:', newTask); // Vérifie que newTask contient les données attendues
    //return newTask; // Assure-toi que ceci renvoie bien les données de la nouvelle tâche
    const newTask = await this.SaveTaskUseCase.handle(createTaskDto);
    return newTask;
  }*/

  @Post('/tasks')
  async create(@Body() dto: SaveTaskDto) {
    // @todo YOU MUST FOLLOW THE SAME IMPLEMENTATION AS OTHER ENDPOINTS
    return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
  }


  @Patch('/tasks/:id')
async update(@Param('id') id: string, @Body() dto: SaveTaskDto) {
  if (!dto.name || dto.name.trim() === '') {
    throw new BadRequestException('Task name is required');
  }
  dto.id = Number(id);
  return (await this.useCaseFactory.create(SaveTaskUseCase)).handle(dto);
}

  @Delete('/tasks/:id')
  async delete(@Param('id') id: string) {
    return (await this.useCaseFactory.create(DeleteTask)).handle(Number(id));
  }
}
