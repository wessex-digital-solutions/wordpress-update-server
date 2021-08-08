import { Test, TestingModule } from '@nestjs/testing';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';

const testPlugin1Name = 'Test plugin 1';
const testPlugin1Description = 'Test plugin 1 description';

describe('PluginsController', () => {
  let controller: PluginsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PluginsController],
      providers: [
        {
          provide: PluginsService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { name: testPlugin1Name, description: testPlugin1Description },
              {
                name: 'Test plugin 2',
                description: 'Test plugin 2 description',
              },
              {
                name: 'Test plugin 3',
                description: 'Test plugin 3 description',
              },
            ]),
            getOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testPlugin1Name,
                description: testPlugin1Description,
                id,
              }),
            ),
            getOneByName: jest
              .fn()
              .mockImplementation((name: string) =>
                Promise.resolve({ name, description: testPlugin1Description }),
              ),
            insertOne: jest
              .fn()
              .mockImplementation((plugin: CreatePluginDto) =>
                Promise.resolve({ id: '123-uuid', ...plugin }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation((plugin: CreatePluginDto) =>
                Promise.resolve({ id: '123-uuid', ...plugin }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<PluginsController>(PluginsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
