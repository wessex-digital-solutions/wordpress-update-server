import { Test, TestingModule } from '@nestjs/testing';
import { CreateThemeDto } from './dto/create-theme.dto';
import { ThemesController } from './themes.controller';
import { ThemesService } from './themes.service';

const testTheme1Name = 'Test theme 1';
const testTheme1Description = 'Test theme 1 description';

describe('ThemesController', () => {
  let controller: ThemesController;
  let service: ThemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemesController],
      providers: [
        {
          provide: ThemesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: testTheme1Name,
                description: testTheme1Description,
                version: '1.0.0',
                enabled: true,
              },
              {
                name: 'Test theme 2',
                description: 'Test theme 2 description',
                version: '1.0.0',
                enabled: true,
              },
              {
                name: 'Test theme 3',
                description: 'Test theme 3 description',
                version: '1.0.0',
                enabled: true,
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testTheme1Name,
                description: testTheme1Description,
                version: '1.0.0',
                enabled: true,
                id,
              }),
            ),
            getOneByName: jest.fn().mockImplementation((name: string) =>
              Promise.resolve({
                name,
                description: testTheme1Description,
                version: '1.0.0',
                enabled: true,
              }),
            ),
            create: jest
              .fn()
              .mockImplementation((theme: CreateThemeDto) =>
                Promise.resolve({ id: 'a-uuid', ...theme }),
              ),
            update: jest
              .fn()
              .mockImplementation((theme: CreateThemeDto) =>
                Promise.resolve({ id: 'a-uuid', ...theme }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
    service = module.get<ThemesService>(ThemesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getThemes', () => {
    it('should return all themes', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          name: testTheme1Name,
          description: testTheme1Description,
          version: '1.0.0',
          enabled: true,
        },
        {
          name: 'Test theme 2',
          description: 'Test theme 2 description',
          version: '1.0.0',
          enabled: true,
        },
        {
          name: 'Test theme 3',
          description: 'Test theme 3 description',
          version: '1.0.0',
          enabled: true,
        },
      ]);
    });
  });

  describe('getTheme', () => {
    it('should return theme by id', async () => {
      await expect(controller.findOne('a-uuid')).resolves.toEqual({
        name: testTheme1Name,
        description: testTheme1Description,
        version: '1.0.0',
        enabled: true,
        id: 'a-uuid',
      });
      await expect(controller.findOne('123-uuid')).resolves.toEqual({
        name: testTheme1Name,
        description: testTheme1Description,
        version: '1.0.0',
        enabled: true,
        id: '123-uuid',
      });
    });
  });

  describe('createTheme', () => {
    it('should create new theme', async () => {
      const newThemeDTO: CreateThemeDto = {
        name: 'Test theme 4',
        description: 'Test theme 4 description',
        version: '1.0.0',
      };
      await expect(controller.create(newThemeDTO)).resolves.toEqual({
        id: 'a-uuid',
        ...newThemeDTO,
      });
    });
  });

  describe('updateTheme', () => {
    it('should update theme', async () => {
      const newThemeDTO: CreateThemeDto = {
        name: 'Test theme 4',
        description: 'Test theme 4 description',
        version: '1.0.0',
      };
      await expect(controller.update(newThemeDTO)).resolves.toEqual({
        id: 'a-uuid',
        ...newThemeDTO,
      });
    });
  });

  describe('deleteTheme', () => {
    it('should delete theme', async () => {
      await expect(controller.remove('a-uuid')).resolves.toEqual({
        deleted: true,
      });
    });
    it('should not delete theme', async () => {
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
