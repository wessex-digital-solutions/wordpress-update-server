import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemesService } from './themes.service';

const testTheme1Name = 'Test theme 1';
const testTheme1Description = 'Test theme 1 description';

const themeArray = [
  new Theme(testTheme1Name, testTheme1Description),
  new Theme('Test theme 2', 'Test theme 2 description'),
  new Theme('Test theme 3', 'Test theme 3 description'),
];

const oneTheme = new Theme(testTheme1Name, testTheme1Description);

describe('ThemesService', () => {
  let service: ThemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemesService,
        {
          provide: getRepositoryToken(Theme),
          useValue: {
            find: jest.fn().mockResolvedValue(themeArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneTheme),
            create: jest.fn().mockReturnValue(oneTheme),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
