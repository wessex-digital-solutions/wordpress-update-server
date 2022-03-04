import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const testUser1 = 'Test User 1';
const testPassword1 = 'Test Password 1';

const testUser2 = 'Test User 2';

const userArray = [
  new User(testUser1, testPassword1),
  new User(testUser2, 'Test Password 2'),
  new User('Test User 3', 'Test Password 3'),
];

const oneUser = new User(testUser1, testPassword1);

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          // define all the methods that you use from the catRepo
          // give proper return values as expected or mock implementations, your choice
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(null),
            findOneOrFail: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockReturnValue(oneUser),
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

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(userArray);
    });
  });

  describe('findOne', () => {
    it('should return one user', () => {
      const repoSpy = jest.spyOn(repo, 'findOneOrFail');
      expect(service.findOne({ id: 1 })).resolves.toEqual(oneUser);
      expect(repoSpy).toHaveBeenCalledWith({ id: 1 });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user = await service.create({
        username: testUser2,
        password: testPassword1,
      });
      expect(user).toBeInstanceOf(User);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      await service.update({
        username: testUser1,
        password: testPassword1,
        id: 1,
      });
      expect(repo.update).toBeCalledTimes(1);
    });
  });

  describe('delete', () => {
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
