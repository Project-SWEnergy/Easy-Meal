import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DatabaseService } from '../database/database.service';
import * as argon from 'argon2';


jest.mock('../database/database.service');
jest.mock('argon2')


describe('UsersService', () => {

  let service: UsersService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          returning: jest.fn().mockResolvedValue([
            {
              id: 1,
              name: 'name',
              surname: 'surname',
              email: 'email',
              password: 'password'
            }
          ]) as any
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersService>(UsersService);
    });

    const mockUserData = {
      name: 'name',
      surname: 'surname',
      email: 'email',
      password: 'password'
    };

    it('should create a user', async () => {
      const expectedData = [
        {
          id: 1,
          name: 'name',
          surname: 'surname',
          email: 'email',
          password: 'password'  // Questo è il valore originale, non hashed
        }
      ];
      const expectedResult = {
        result: true,
        message: "Successfully created: user",
        data: expectedData
      };
      (argon.hash as jest.Mock).mockImplementation(() => {
        return "false";
      });
      const result = await service.create(mockUserData);
      expect(result).toEqual(expectedResult);
    })
  });


  describe('findOne', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id: 1,
                  name: 'name',
                  surname: 'surname',
                  email: 'email'
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersService>(UsersService);
    });

    const mockUserId = 1;
    const expectedData = [
      {
        id: 1,
        name: 'name',
        surname: 'surname',
        email: 'email'
      }
    ];
    const expectedResult = {
      result: true,
      message: "Research successfull",
      data: expectedData
    };

    it('should find a user', async () => {
      const result = await service.findOne(mockUserId);
      expect(result).toEqual(expectedResult);
    })

    it('should throw BadRequestException if user ID is invalid', async () => {
      await expect(service.findOne(1.1)).rejects.toThrow();
    });

  });

  describe('update', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockResolvedValue([
            {
              id: 1,
              name: 'name',
              surname: 'surname',
              email: 'email'
            }
          ]) as any
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersService>(UsersService);
    });

    const mockUserId = 1;
    const mockUpdateUserDto = {
      name: 'name',
      surname: 'surname',
      email: 'email',
      password: 'password'
    };
    const expectedData = [
      {
        id: 1,
        name: 'name',
        surname: 'surname',
        email: 'email'
      }
    ];
    const expectedResult = {
      result: true,
      message: "Successfully updated: user",
      data: expectedData
    };

    it('should update a user', async () => {
      (argon.hash as jest.Mock).mockImplementation(() => {
        return "false";
      });
      const result = await service.update(mockUpdateUserDto, mockUserId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if user ID is invalid', async () => {
      await expect(service.update(mockUpdateUserDto, 1.1)).rejects.toThrow();
    });

  });

  describe('remove', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          delete: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockResolvedValue([
            {
              id: 1,
              name: 'name',
              surname: 'surname',
              email: 'email'
            }
          ]) as any
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersService>(UsersService);
    });

    const mockUserId = 1;
    const expectedData = [
      {
        id: 1,
        name: 'name',
        surname: 'surname',
        email: 'email'
      }
    ];
    const expectedResult = {
      result: true,
      message: "Successfully deleted: user",
      data: expectedData
    };

    it('should delete a user', async () => {
      const result = await service.remove(mockUserId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if user ID is invalid', async () => {
      await expect(service.remove(1.1)).rejects.toThrow();
    });

  });
});
