import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plugin } from '../plugins/entities/plugin.entity';
import { Repository } from 'typeorm';
import { Update } from './entities/update.entity';
import { UpdatesService } from './updates.service';

const testUpdate1Filename = 'test-update-1.zip';
const testUpdate1Path = 'updates/plugin1Name/';
const testUpdate1Version = '1.0.0';
const testUpdate1Hash = 'test-update-1-hash';
const testUpdate1changelog = 'test-update-1-changelog';
const testUpdate1isStable = true;
const testUpdate1isPrerelease = false;
const testUpdate1isPublished = true;
const testUpdate1CreatedAt = new Date();
const testUpdate1Plugin = new Plugin(
  'test-plugin-name',
  'test-plugin-description',
  '1.0.1',
  'test-plugin-homepage',
  ['test-keyword-1', 'test-keyword-2'],
  'test-plugin-license',
  'test-plugin-repository',
);

const updateArray = [
  new Update({
    filename: testUpdate1Filename,
    path: testUpdate1Path,
    version: testUpdate1Version,
    hash: testUpdate1Hash,
    changelog: testUpdate1changelog,
    isStable: testUpdate1isStable,
    isPrerelease: testUpdate1isPrerelease,
    isPublished: testUpdate1isPublished,
    createdAt: testUpdate1CreatedAt,
    plugin: testUpdate1Plugin,
  }),
  new Update({
    filename: 'test-update-2.zip',
    path: 'updates/plugin2Name/',
    version: '1.0.1',
    hash: 'test-update-2-hash',
    changelog: 'test-update-2-changelog',
    isStable: false,
    isPrerelease: true,
    isPublished: false,
    createdAt: new Date(),
    plugin: new Plugin('test-plugin2-name', 'test-plugin2-description'),
  }),
  new Update({
    filename: 'test-update-3.zip',
    path: 'updates/plugin3Name/',
    version: '1.0.2',
    hash: 'test-update-3-hash',
    changelog: 'test-update-3-changelog',
    isStable: true,
    isPrerelease: false,
    isPublished: true,
    createdAt: new Date(),
    plugin: new Plugin('test-plugin3-name', 'test-plugin3-description'),
  }),
];

const oneUpdate = new Update({
  filename: testUpdate1Filename,
  path: testUpdate1Path,
  version: testUpdate1Version,
  hash: testUpdate1Hash,
  changelog: testUpdate1changelog,
  isStable: testUpdate1isStable,
  isPrerelease: testUpdate1isPrerelease,
  isPublished: testUpdate1isPublished,
  createdAt: testUpdate1CreatedAt,
  plugin: testUpdate1Plugin,
});

describe('UpdatesService', () => {
  let service: UpdatesService;
  let repo: Repository<Update>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatesService,
        {
          provide: getRepositoryToken(Update),
          useValue: {
            find: jest.fn().mockResolvedValue(updateArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneUpdate),
            create: jest.fn().mockReturnValue(oneUpdate),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<UpdatesService>(UpdatesService);
    repo = module.get<Repository<Update>>(getRepositoryToken(Update));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all updates', async () => {
      const result = await service.findAll();
      expect(result).toBeDefined();
      expect(result).toEqual(updateArray);
    });
  });

  describe('findOne', () => {
    it('should return one update', async () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne('a-uuid')).resolves.toEqual(oneUpdate);
      expect(repoSpy).toHaveBeenCalledWith({ id: 'a-uuid' });
    });
  });

  describe('create', () => {
    it('should successfully insert an update', () => {
      expect(service.create(oneUpdate)).resolves.toEqual(oneUpdate);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toHaveBeenCalledWith(oneUpdate);
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should successfully update an update', async () => {
      const update = await service.update({
        id: 'a-uuid',
        filename: testUpdate1Filename,
        path: testUpdate1Path,
        version: testUpdate1Version,
        hash: testUpdate1Hash,
        changelog: testUpdate1changelog,
        isStable: testUpdate1isStable,
        isPrerelease: testUpdate1isPrerelease,
        isPublished: testUpdate1isPublished,
        createdAt: testUpdate1CreatedAt,
      });
      expect(update).toEqual(oneUpdate);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toHaveBeenCalledWith(
        { id: 'a-uuid' },
        {
          id: 'a-uuid',
          filename: testUpdate1Filename,
          path: testUpdate1Path,
          version: testUpdate1Version,
          hash: testUpdate1Hash,
          changelog: testUpdate1changelog,
          isStable: testUpdate1isStable,
          isPrerelease: testUpdate1isPrerelease,
          isPublished: testUpdate1isPublished,
          createdAt: testUpdate1CreatedAt,
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
