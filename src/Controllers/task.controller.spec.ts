import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request = require('supertest');
import TaskController from './TaskController';
import UseCaseFactory from '../UseCase/UseCaseFactory';
import SaveTaskUseCase from '../UseCase/SaveTask/SaveTaskUseCase';
import TaskRepository from '../Repositories/TaskRepository';
import { PrismaService } from '../PrismaService';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('TaskController', () => {
  let app: INestApplication;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [TaskController],
      providers: [
        UseCaseFactory,
        SaveTaskUseCase,
        TaskRepository,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    app = module.createNestApplication();
    taskRepository = module.get<TaskRepository>(TaskRepository);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/POST tasks', async () => {
    const newTask = { name: 'Test Task' };
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send(newTask);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newTask.name);
  });

  it('/PATCH tasks/:id', async () => {
    const updatedTask = { name: 'Updated Task' };
    const existingTask = await taskRepository.save({ name: 'Existing Task' });

    const response = await request(app.getHttpServer())
      .patch(`/tasks/${existingTask.id}`)
      .send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedTask.name);
  });
});
