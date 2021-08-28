import { Test, TestingModule } from '@nestjs/testing';
import { Plugin } from '../plugins/entities/plugin.entity';
import { CreateUpdateDto } from './dto/create-update.dto';
import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';

const testDate = new Date();

const testUpdate1Filename = 'test-update-1.zip';
const testUpdate1Path = 'updates/plugin1Name/';
const testUpdate1Version = '1.0.0';
const testUpdate1Hash = 'test-update-1-hash';
const testUpdate1changelog = 'test-update-1-changelog';
const testUpdate1isStable = true;
const testUpdate1isPrerelease = false;
const testUpdate1isPublished = true;
const testUpdate1CreatedAt = testDate;
const testUpdate1Plugin = new Plugin(
  'test-plugin-name',
  'test-plugin-description',
  '1.0.1',
  'test-plugin-homepage',
  ['test-keyword-1', 'test-keyword-2'],
  'test-plugin-license',
  'test-plugin-repository',
);

describe('UpdatesController', () => {
  let controller: UpdatesController;
  let service: UpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatesController],
      providers: [
        {
          provide: UpdatesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
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
              },
              {
                filename: 'test-update-2.zip',
                path: 'updates/plugin2Name/',
                version: '2.0.0',
                hash: 'test-update-2-hash',
                changelog: 'test-update-2-changelog',
                isStable: true,
                isPrerelease: false,
                isPublished: true,
                createdAt: testDate,
                plugin: {
                  name: 'test-plugin-name-2',
                  description: 'test-plugin-description-2',
                  version: '2.0.1',
                  homepage: 'test-plugin-homepage-2',
                  keywords: ['test-keyword-1-2', 'test-keyword-2-2'],
                  license: 'test-plugin-license-2',
                  repository: 'test-plugin-repository-2',
                },
              },
              {
                filename: 'test-update-3.zip',
                path: 'updates/plugin3Name/',
                version: '3.0.0',
                hash: 'test-update-3-hash',
                changelog: 'test-update-3-changelog',
                isStable: true,
                isPrerelease: false,
                isPublished: true,
                createdAt: testDate,
                plugin: {
                  name: 'test-plugin-name-3',
                  description: 'test-plugin-description-3',
                  version: '3.0.1',
                  homepage: 'test-plugin-homepage-3',
                  keywords: ['test-keyword-1-3', 'test-keyword-2-3'],
                  license: 'test-plugin-license-3',
                  repository: 'test-plugin-repository-3',
                },
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                id: id,
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
            ),
            create: jest
              .fn()
              .mockImplementation((update: CreateUpdateDto) =>
                Promise.resolve({ id: 'a-uuid', ...update }),
              ),
            update: jest
              .fn()
              .mockImplementation((update: CreateUpdateDto) =>
                Promise.resolve({ id: 'a-uuid', ...update }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdatesController>(UpdatesController);
    service = module.get<UpdatesService>(UpdatesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all updates', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
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
        },
        {
          filename: 'test-update-2.zip',
          path: 'updates/plugin2Name/',
          version: '2.0.0',
          hash: 'test-update-2-hash',
          changelog: 'test-update-2-changelog',
          isStable: true,
          isPrerelease: false,
          isPublished: true,
          createdAt: testDate,
          plugin: {
            name: 'test-plugin-name-2',
            description: 'test-plugin-description-2',
            version: '2.0.1',
            homepage: 'test-plugin-homepage-2',
            keywords: ['test-keyword-1-2', 'test-keyword-2-2'],
            license: 'test-plugin-license-2',
            repository: 'test-plugin-repository-2',
          },
        },
        {
          filename: 'test-update-3.zip',
          path: 'updates/plugin3Name/',
          version: '3.0.0',
          hash: 'test-update-3-hash',
          changelog: 'test-update-3-changelog',
          isStable: true,
          isPrerelease: false,
          isPublished: true,
          createdAt: testDate,
          plugin: {
            name: 'test-plugin-name-3',
            description: 'test-plugin-description-3',
            version: '3.0.1',
            homepage: 'test-plugin-homepage-3',
            keywords: ['test-keyword-1-3', 'test-keyword-2-3'],
            license: 'test-plugin-license-3',
            repository: 'test-plugin-repository-3',
          },
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return an update', async () => {
      await expect(controller.findOne('a-uuid')).resolves.toEqual({
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
        plugin: testUpdate1Plugin,
      });
      await expect(controller.findOne('another-uuid')).resolves.toEqual({
        id: 'another-uuid',
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
    });
  });

  describe('create', () => {
    it('should create an update', async () => {
      await expect(
        controller.create({
          filename: 'test-update-4.zip',
          path: 'updates/plugin4Name/',
          version: '4.0.0',
          hash: 'test-update-4-hash',
          changelog: 'test-update-4-changelog',
          isStable: true,
          isPrerelease: false,
          isPublished: true,
          createdAt: testDate,
        }),
      ).resolves.toEqual({
        id: 'a-uuid',
        filename: 'test-update-4.zip',
        path: 'updates/plugin4Name/',
        version: '4.0.0',
        hash: 'test-update-4-hash',
        changelog: 'test-update-4-changelog',
        isStable: true,
        isPrerelease: false,
        isPublished: true,
        createdAt: testDate,
      });
    });
  });

  describe('update', () => {
    it('should update an update', async () => {
      await expect(
        controller.update({
          id: 'a-uuid',
          filename: 'test-update-4.zip',
          path: 'updates/plugin4Name/',
          version: '4.0.0',
          hash: 'test-update-4-hash',
          changelog: 'test-update-4-changelog',
          isStable: true,
          isPrerelease: false,
          isPublished: true,
          createdAt: testDate,
        }),
      ).resolves.toEqual({
        id: 'a-uuid',
        filename: 'test-update-4.zip',
        path: 'updates/plugin4Name/',
        version: '4.0.0',
        hash: 'test-update-4-hash',
        changelog: 'test-update-4-changelog',
        isStable: true,
        isPrerelease: false,
        isPublished: true,
        createdAt: testDate,
      });
    });
  });

  describe('delete', () => {
    it('should delete an update', async () => {
      await expect(controller.remove('a-uuid')).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete an update', async () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ deleted: false });
      await expect(controller.remove('a-bad-uuid')).resolves.toEqual({
        deleted: false,
      });
      expect(deleteSpy).toBeCalledWith('a-bad-uuid');
    });
  });
});
