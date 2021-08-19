import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plugin } from './entities/plugin.entity';
import { PluginsService } from './plugins.service';

const testPlugin1Name = 'Test plugin 1';
const testPlugin1Description = 'Test plugin 1 description';

const pluginArray = [
  new Plugin(testPlugin1Name, testPlugin1Description),
  new Plugin('Test plugin 2', 'Test plugin 2 description'),
  new Plugin('Test plugin 3', 'Test plugin 3 description'),
];

const onePlugin = new Plugin(testPlugin1Name, testPlugin1Description, '1.0.0');

describe('PluginsService', () => {
  let service: PluginsService;
  let repo: Repository<Plugin>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PluginsService,
        {
          provide: getRepositoryToken(Plugin),
          useValue: {
            find: jest.fn().mockResolvedValue(pluginArray),
            findOneOrFail: jest.fn().mockResolvedValue(onePlugin),
            create: jest.fn().mockReturnValue(onePlugin),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<PluginsService>(PluginsService);
    repo = module.get<Repository<Plugin>>(getRepositoryToken(Plugin));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of plugins', async () => {
      const plugins = await service.findAll();
      expect(plugins).toBeDefined();
      expect(plugins).toEqual(pluginArray);
    });
  });

  describe('getOne', () => {
    it('should return a plugin', async () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne('a-uuid')).resolves.toEqual(onePlugin);
      expect(repoSpy).toHaveBeenCalledWith({ id: 'a-uuid' });
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a plugin', () => {
      expect(
        service.create({
          name: testPlugin1Name,
          description: testPlugin1Description,
          version: '1.0.0',
        }),
      ).resolves.toEqual(onePlugin);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toHaveBeenCalledWith({
        name: testPlugin1Name,
        description: testPlugin1Description,
        version: '1.0.0',
        enabled: true,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('updateOne', () => {
    it('should call the update plugin method', async () => {
      const plugin = await service.update({
        id: 'a-uuid',
        name: testPlugin1Name,
        description: testPlugin1Description,
        version: '1.0.0',
      });
      expect(plugin).toEqual(onePlugin);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toHaveBeenCalledWith(
        { id: 'a-uuid' },
        {
          id: 'a-uuid',
          name: testPlugin1Name,
          description: testPlugin1Description,
          version: '1.0.0',
        },
      );
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove('a-uuid')).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method'));
      expect(service.remove('a-uuid')).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method',
      });
      expect(repoSpy).toHaveBeenCalledWith({ id: 'a-uuid' });
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });
  });
});
