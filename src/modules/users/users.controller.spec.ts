import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const testUser1 = 'Test User 1';
const testPassword1 = 'Test Password 1';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { username: testUser1, password: testPassword1 },
              { username: 'Test User 2', password: 'Test Password 2' },
              { username: 'Test User 3', password: 'Test Password 3' },
            ]),
            findOne: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                username: testUser1,
                password: testPassword1,
                id,
              }),
            ),
            getOneByName: jest
              .fn()
              .mockImplementation((username: string) =>
                Promise.resolve({ username, password: testPassword1 }),
              ),
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            update: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all users', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        { username: testUser1, password: testPassword1 },
        { username: 'Test User 2', password: 'Test Password 2' },
        { username: 'Test User 3', password: 'Test Password 3' },
      ]);
    });
  });

  describe('findOne()', () => {
    it('should return user by id', async () => {
      await expect(controller.findOne(1)).resolves.toEqual({
        username: testUser1,
        password: testPassword1,
        id: 1,
      });
      await expect(controller.findOne(101)).resolves.toEqual({
        username: testUser1,
        password: testPassword1,
        id: 101,
      });
    });
  });

  describe('create', () => {
    it('should create user', async () => {
      const newUserDTO: CreateUserDto = {
        username: 'New User',
        password: 'New Password',
      };
      await expect(controller.create(newUserDTO)).resolves.toEqual({
        id: 1,
        ...newUserDTO,
      });
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const newUserDTO: CreateUserDto = {
        username: 'New User',
        password: 'New Password',
      };
      await expect(controller.update(newUserDTO)).resolves.toEqual({
        id: 1,
        ...newUserDTO,
      });
    });
  });

  describe('delete', () => {
    it('should return that it deleted a user', async () => {
      await expect(controller.remove(1)).resolves.toEqual({
        deleted: true,
      });
    });
    it('should return that it did not delete a user', async () => {
      const deleteSpy = jest
        .spyOn(service, 'remove')
        .mockResolvedValueOnce({ deleted: false });
      await expect(controller.remove(100)).resolves.toEqual({ deleted: false });
      expect(deleteSpy).toBeCalledWith(100);
    });
  });
});
