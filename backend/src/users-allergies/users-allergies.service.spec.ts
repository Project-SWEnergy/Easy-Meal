import { Test, TestingModule } from '@nestjs/testing';
import { UsersAllergiesService } from './users-allergies.service';
import { DatabaseService } from '../database/database.service';

jest.mock('../database/database.service');


describe('UsersAllergiesService', () => {
  let service: UsersAllergiesService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersAllergiesService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<UsersAllergiesService>(UsersAllergiesService);
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
          returning: jest.fn().mockReturnValueOnce([
            {
              id_user: 1,
              id_allergy: 1
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersAllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersAllergiesService>(UsersAllergiesService);
    });


    it('should create a user allergy', async () => {
      const createUsersAllergyDto = {
        allergyId: [1, 2, 3]
      };
      const userId = 1;
      const result = await service.create(createUsersAllergyDto, userId);
      expect(result.result).toBe(true);
      expect(result.message).toBe("Successfully created: user-allergy");
      expect(result.data.length).toBe(3);
    });

    it('should throw an error when the user ID is invalid', async () => {
      const createUsersAllergyDto = {
        allergyId: [1, 2, 3]
      };
      const userId = 0.5;
      await expect(service.create(createUsersAllergyDto, userId)).rejects.toThrow();
    });

    /*it('should throw an error when the user-allergy creation fails', async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          returning: jest.fn().mockRejectedValueOnce(new Error("Error")) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersAllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersAllergiesService>(UsersAllergiesService);

      const createUsersAllergyDto = {
        allergyId: [1, 2, 3]
      };
      const userId = 1;
      await expect(service.create(createUsersAllergyDto, userId)).rejects.toThrow();
    });*/


    /*it('should throw InternalServerErrorException if not all allergies are created', async () => {

      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id_user: 1,
              id_allergy: 1
            }
          ]).mockReturnValueOnce([
            {
              id_user: 1,
              id_allergy: 2
            }
          ]).mockRejectedValueOnce(new InternalServerErrorException("Failed to create all user-allergies")) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersAllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<UsersAllergiesService>(UsersAllergiesService);

      const createUsersAllergyDto = {
        allergyId: [1, 2, 3]
      };

      await expect(service.create(createUsersAllergyDto, 1))
        .rejects
        .toThrow(InternalServerErrorException);
    });*/
  });

  describe('findAllByUser', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  {
                    userId: 1, // Assuming these values are correctly sourced for testing
                    allergyId: 1,
                    allergyName: "Test Allergy",
                  }
                ]) as any
              })
            })
          })
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersAllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<UsersAllergiesService>(UsersAllergiesService);

    });

    it('should find all allergies by user', async () => {
      const userId = 1;
      const result = await service.findAllByUser(userId);
      expect(result.result).toBe(true);
      expect(result.data.length).toBe(1);
    });

    it('should throw an error when the user ID is invalid', async () => {
      const userId = 0.5;
      await expect(service.findAllByUser(userId)).rejects.toThrow();
    });

  }); //fine findAllByUser

  describe('findOneByUser', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  {
                    userId: 1, // Assuming these values are correctly sourced for testing
                    allergyId: 1,
                    allergyName: "Test Allergy",
                  }
                ]) as any
              })
            })
          })
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersAllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<UsersAllergiesService>(UsersAllergiesService);

    });

    it('should find one allergy by user', async () => {
      const userId = 1;
      const allergyId = 1;
      const result = await service.findOneByUser(userId, allergyId);
      expect(result.result).toBe(true);
      expect(result.data.length).toBe(1);
    });

    it('should throw an error when the user ID is invalid', async () => {
      const userId = 0.5;
      const allergyId = 1;
      await expect(service.findOneByUser(userId, allergyId)).rejects.toThrow();
    });

    it('should throw an error when the allergy ID is invalid', async () => {
      const userId = 1;
      const allergyId = 0.5;
      await expect(service.findOneByUser(userId, allergyId)).rejects.toThrow();
    });
  }); //fine findOneByUser


  describe('update', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          transaction: jest.fn().mockImplementation(async (transactionCallback) => {
            const transaction = {
              delete: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue({
                  returning: jest.fn().mockResolvedValue([{ userId: 1 }])
                })
              }),
              insert: jest.fn().mockReturnValue({
                values: jest.fn().mockReturnValue({
                  returning: jest.fn().mockResolvedValue([{ userId: 1, allergyId: 2 }])
                })
              }),
              rollback: jest.fn()
            };
            return await transactionCallback(transaction);
          })
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersAllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<UsersAllergiesService>(UsersAllergiesService);

    });

    //TODO: fix this test
    /*it('should update one allergy by user', async () => {
      const userId = 1;
      const allergyId = 1;

      
      let createUsersAllergyDtoMock = {
        allergyId: [1],
      };

      const result = await service.update(userId, createUsersAllergyDtoMock);
      expect(result.result).toBe(true);
      expect(result.data.length).toBe(1);
    });*/

    it('should throw an error when the user ID is invalid', async () => {
      let createUsersAllergyDtoMock = {
        allergyId: [1],
      };
      const userId = 0.5;
      const allergyId = 1;
      await expect(service.update(userId, createUsersAllergyDtoMock)).rejects.toThrow();
    });

    it('should throw an error when the allergy ID is invalid', async () => {

      let createUsersAllergyDtoMock = {
        allergyId: [0.5],
      };

      const userId = 1;
      const allergyId = 0.5;
      await expect(service.update(userId, createUsersAllergyDtoMock)).rejects.toThrow();
    });
  }); //fine update

});
