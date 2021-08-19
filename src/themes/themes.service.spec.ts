import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  let repo: Repository<Theme>;

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
    repo = module.get<Repository<Theme>>(getRepositoryToken(Theme));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all themes', async () => {
      const themes = await service.findAll();
      expect(themes).toEqual(themeArray);
    });
  });

  describe('getOne', () => {
    it('should return one theme', async () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne('a-uuid')).resolves.toEqual(oneTheme);
      expect(repoSpy).toHaveBeenCalledWith({ id: 'a-uuid' });
    });
  });

  describe('create', () => {
    it('should successfully insert a theme', () => {
      expect(
        service.create({
          name: testTheme1Name,
          description: testTheme1Description,
          version: '1.0.0',
          enabled: true,
        }),
      ).resolves.toEqual(oneTheme);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        name: testTheme1Name,
        description: testTheme1Description,
        version: '1.0.0',
        enabled: true,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should caa the update method', async () => {
      const theme = await service.update({
        id: 'a-uuid',
        name: testTheme1Name,
        description: testTheme1Description,
        version: '1.0.0',
      });
      expect(theme).toEqual(oneTheme);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(
        {
          id: 'a-uuid',
        },
        {
          id: 'a-uuid',
          name: testTheme1Name,
          description: testTheme1Description,
          version: '1.0.0',
        },
      );
    });
  });

  describe('delete', () => {
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
