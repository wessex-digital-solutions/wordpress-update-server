import { Test, TestingModule } from '@nestjs/testing';
import { CreateThemeDto } from './dto/create-theme.dto';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

const testTheme1Name = 'Test theme 1';
const testTheme1Description = 'Test theme 1 description';

describe('ThemesController', () => {
  let controller: ThemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [
        {
          provide: ThemesService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { name: testTheme1Name, description: testTheme1Description },
              {
                name: 'Test theme 2',
                description: 'Test theme 2 description',
              },
              {
                name: 'Test theme 3',
                description: 'Test theme 3 description',
              },
            ]),
            getOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testTheme1Name,
                description: testTheme1Description,
                id,
              }),
            ),
            getOneByName: jest
              .fn()
              .mockImplementation((name: string) =>
                Promise.resolve({ name, description: testTheme1Description }),
              ),
            insertOne: jest
              .fn()
              .mockImplementation((theme: CreateThemeDto) =>
                Promise.resolve({ id: '123-uuid', ...theme }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation((theme: CreateThemeDto) =>
                Promise.resolve({ id: '123-uuid', ...theme }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
