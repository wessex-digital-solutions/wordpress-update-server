import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';

const testAuthor1Name = 'Test Author 1';
const testAuthor1location = 'Test Author 1 Location';
const testAuthor1Website = 'http://www.newwebsite.com';
const testAuthor1Bio = 'New Bio 1';

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: testAuthor1Name,
                location: testAuthor1location,
                website: testAuthor1Website,
                bio: testAuthor1Bio,
              },
              { name: 'Test Author 2', location: 'Test Author 2 Location' },
              { name: 'Test Author 3', location: 'Test Author 3 Location' },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                name: testAuthor1Name,
                location: testAuthor1location,
                id,
              }),
            ),
            getOneByName: jest
              .fn()
              .mockImplementation((name: string) =>
                Promise.resolve({ name, location: testAuthor1location }),
              ),
            create: jest
              .fn()
              .mockImplementation((author: CreateAuthorDto) =>
                Promise.resolve({ id: 1, ...author }),
              ),
            update: jest
              .fn()
              .mockImplementation((author: CreateAuthorDto) =>
                Promise.resolve({ id: 1, ...author }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAuthors', () => {
    it('should get an array of authors', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        {
          name: testAuthor1Name,
          location: testAuthor1location,
          website: testAuthor1Website,
          bio: testAuthor1Bio,
        },
        {
          name: 'Test Author 2',
          location: 'Test Author 2 Location',
        },
        {
          name: 'Test Author 3',
          location: 'Test Author 3 Location',
        },
      ]);
    });
  });
  describe('getById', () => {
    it('should get a single author', async () => {
      await expect(controller.findOne(100)).resolves.toEqual({
        name: testAuthor1Name,
        location: testAuthor1location,
        id: 100,
      });
      await expect(controller.findOne(101)).resolves.toEqual({
        name: testAuthor1Name,
        location: testAuthor1location,
        id: 101,
      });
    });
  });
  // describe('getByName', () => {
  //   it('should get a cat back', async () => {
  //     await expect(controller.getByName('Ventus')).resolves.toEqual({
  //       name: 'Ventus',
  //       breed: testBreed1,
  //       age: 4,
  //     });
  //     const getByNameSpy = jest
  //       .spyOn(service, 'getOneByName')
  //       .mockResolvedValueOnce({
  //         name: 'Aqua',
  //         breed: 'Maine Coon',
  //         age: 5,
  //         id: 'a new uuid',
  //       });
  //     await expect(controller.getByName('Aqua')).resolves.toEqual({
  //       name: 'Aqua',
  //       breed: 'Maine Coon',
  //       age: 5,
  //       id: 'a new uuid',
  //     });
  //     expect(getByNameSpy).toBeCalledWith('Aqua');
  //   });
  // });
  describe('newAuthor', () => {
    it('should create a new author', async () => {
      const newAuthorDTO: CreateAuthorDto = {
        name: 'New Author 1',
        location: 'New Location 1',
        website: 'http://www.newwebsite.com',
        bio: 'New Bio 1',
      };
      await expect(controller.create(newAuthorDTO)).resolves.toEqual({
        id: 1,
        ...newAuthorDTO,
      });
    });
  });
  describe('updateAuthor', () => {
    it('should update a new author', async () => {
      const newAuthorDTO: CreateAuthorDto = {
        name: 'New Author 1',
        location: 'New Location 1',
        website: 'http://www.newwebsite.com',
        bio: 'New Bio 1',
      };
      await expect(controller.update(newAuthorDTO)).resolves.toEqual({
        id: 1,
        ...newAuthorDTO,
      });
    });
  });
  describe('deleteAuthor', () => {
    it('should return that it deleted an author', async () => {
      await expect(controller.remove(1)).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete an author', async () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ deleted: false });
      await expect(controller.remove(100)).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith(100);
    });
  });
});
