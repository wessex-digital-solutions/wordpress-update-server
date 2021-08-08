import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const testUser1 = 'Test User 1';
const testPassword1 = 'Test Password 1';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([
              { username: testUser1, password: testPassword1 },
              { username: 'Test User 2', password: 'Test Password 2' },
              { username: 'Test User 3', password: 'Test Password 3' },
            ]),
            getOne: jest.fn().mockImplementation((id: number) =>
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
            insertOne: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 1, ...user }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
