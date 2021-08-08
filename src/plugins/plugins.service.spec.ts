import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plugin } from './entities/plugin.entity';
import { PluginsService } from './plugins.service';

const testPlugin1Name = 'Test plugin 1';
const testPlugin1Description = 'Test plugin 1 description';

const pluginArray = [
  new Plugin(testPlugin1Name, testPlugin1Description),
  new Plugin('Test plugin 2', 'Test plugin 2 description'),
  new Plugin('Test plugin 3', 'Test plugin 3 description'),
];

const onePlugin = new Plugin(testPlugin1Name, testPlugin1Description);

describe('PluginsService', () => {
  let service: PluginsService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
