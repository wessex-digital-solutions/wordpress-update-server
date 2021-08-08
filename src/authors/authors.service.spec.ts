import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';

const testAuthor1Name = 'Test Author 1';
const testAuthor1Location = 'Test Location 1';
const testAuthor1Website = '';
const testAuthor1Bio = '';

const authorArray = [
  new Author(testAuthor1Name, testAuthor1Location),
  new Author('Test Author 2', 'Test Location 2'),
  new Author('Test Author 3', 'Test Location 3'),
];

const oneAuthor = new Author(
  testAuthor1Name,
  testAuthor1Location,
  testAuthor1Website,
  testAuthor1Bio,
);

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repo: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            find: jest.fn().mockResolvedValue(authorArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneAuthor),
            create: jest.fn().mockReturnValue(oneAuthor),
            save: jest.fn(),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            update: jest.fn().mockResolvedValue(true),
            // as these do not actually use their return values in our sample
            // we just make sure that their resolve is true to not crash
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repo = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of authors', async () => {
      const authors = await service.findAll();
      expect(authors).toEqual(authorArray);
    });
  });

  describe('getOne', () => {
    it('should get a single author', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne(1)).resolves.toEqual(oneAuthor);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });
  describe('insertOne', () => {
    it('should successfully insert an author', () => {
      expect(
        service.create({
          name: testAuthor1Name,
          location: testAuthor1Location,
          website: testAuthor1Website,
          bio: testAuthor1Bio,
        }),
      ).resolves.toEqual(oneAuthor);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.create).toBeCalledWith({
        name: testAuthor1Name,
        location: testAuthor1Location,
        website: testAuthor1Website,
        bio: testAuthor1Bio,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });
  describe('updateOne', () => {
    it('should call the update method', async () => {
      const author = await service.update({
        name: testAuthor1Name,
        location: testAuthor1Location,
        website: testAuthor1Website,
        bio: testAuthor1Bio,
        id: 1,
      });
      expect(author).toEqual(oneAuthor);
      expect(repo.update).toBeCalledTimes(1);
      expect(repo.update).toBeCalledWith(
        { id: 1 },
        {
          name: testAuthor1Name,
          location: testAuthor1Location,
          website: testAuthor1Website,
          bio: testAuthor1Bio,
          id: 1,
        },
      );
    });
  });
  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(service.remove(1)).resolves.toEqual({ deleted: true });
    });
    it('should return {deleted: false, message: err.message}', () => {
      const repoSpy = jest
        .spyOn(repo, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      expect(service.remove(100)).resolves.toEqual({
        deleted: false,
        message: 'Bad Delete Method.',
      });
      expect(repoSpy).toBeCalledWith({ id: 100 });
      expect(repoSpy).toBeCalledTimes(1);
    });
  });
});
