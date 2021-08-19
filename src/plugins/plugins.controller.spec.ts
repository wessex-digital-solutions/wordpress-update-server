import { Test, TestingModule } from '@nestjs/testing';
import { CreatePluginDto } from './dto/create-plugin.dto';
import { PluginsController } from './plugins.controller';
import { PluginsService } from './plugins.service';

const testPlugin1Name = 'Test plugin 1';
const testPlugin1Description = 'Test plugin 1 description';

describe('PluginsController', () => {
  let controller: PluginsController;
  let service: PluginsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PluginsController],
      providers: [
        {
          provide: PluginsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: testPlugin1Name,
                description: testPlugin1Description,
                version: '1.0.0',
                enabled: true,
              },
              {
                name: 'Test plugin 2',
                description: 'Test plugin 2 description',
                version: '1.0.0',
                enabled: true,
              },
              {
                name: 'Test plugin 3',
                description: 'Test plugin 3 description',
                version: '1.0.0',
                enabled: true,
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
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
            create: jest
              .fn()
              .mockImplementation((plugin: CreatePluginDto) =>
                Promise.resolve({ id: 'a-uuid', ...plugin }),
              ),
            update: jest
              .fn()
              .mockImplementation((plugin: CreatePluginDto) =>
                Promise.resolve({ id: 'a-uuid', ...plugin }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<PluginsController>(PluginsController);
    service = module.get<PluginsService>(PluginsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPlugins', () => {
    it('should return all plugins', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          name: testPlugin1Name,
          description: testPlugin1Description,
          version: '1.0.0',
          enabled: true,
        },
        {
          name: 'Test plugin 2',
          description: 'Test plugin 2 description',
          version: '1.0.0',
          enabled: true,
        },
        {
          name: 'Test plugin 3',
          description: 'Test plugin 3 description',
          version: '1.0.0',
          enabled: true,
        },
      ]);
    });
  });

  describe('getPlugin', () => {
    it('should return plugin by id', async () => {
      await expect(controller.findOne('a-uuid')).resolves.toEqual({
        name: testPlugin1Name,
        description: testPlugin1Description,
        id: 'a-uuid',
      });
      await expect(controller.findOne('123-uuid')).resolves.toEqual({
        name: testPlugin1Name,
        description: testPlugin1Description,
        id: '123-uuid',
      });
    });
  });

  describe('newPlugin', () => {
    it('should create new plugin', async () => {
      const newPluginDTO: CreatePluginDto = {
        name: 'Test plugin',
        description: 'Test plugin description',
        version: '1.0.0',
        enabled: true,
      };

      await expect(controller.create(newPluginDTO)).resolves.toEqual({
        id: 'a-uuid',
        ...newPluginDTO,
      });
    });
  });

  describe('updatePlugin', () => {
    it('should update plugin', async () => {
      const newPluginDTO: CreatePluginDto = {
        name: 'Test plugin',
        description: 'Test plugin description',
        version: '1.0.0',
      };

      await expect(controller.update(newPluginDTO)).resolves.toEqual({
        id: 'a-uuid',
        ...newPluginDTO,
      });
    });
  });

  describe('deletePlugin', () => {
    it('should return that it deleted a plugin', async () => {
      await expect(controller.remove('a-uuid')).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a plugin', async () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ deleted: false });
      await expect(controller.remove('123-uuid')).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toHaveBeenCalledWith('123-uuid');
    });
  });
});
