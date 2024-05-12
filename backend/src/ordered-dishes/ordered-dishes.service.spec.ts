import { Test, TestingModule } from '@nestjs/testing';
import { OrderedDishesService } from './ordered-dishes.service';
import { DatabaseService } from '../database/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthorizationService } from '../authorization/authorization.service';
import { ReservationsService } from '../reservations/reservations.service';
import { OrderedDishesController } from './ordered-dishes.controller';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';
import { JwtService } from '@nestjs/jwt';
import { CreateOrderedDishDto } from './dto/create-ordered-dish.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateOrderedDishDto } from './dto/update-ordered-dish.dto';
import { groupBy } from 'rxjs';

describe('OrderedDishesService', () => {
  let service: OrderedDishesService;
  let databaseServiceMock: Partial<DatabaseService>;
  let reservationsService: Partial<ReservationsService>;
  let notificationsService: Partial<NotificationsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [OrderedDishesController],
      providers: [
        OrderedDishesService,
        ReservationsService,
        AuthorizationService,
        ConfigService,
        {provide: NotificationsService, useValue: notificationsService},
        UsersReservationsService,
        JwtService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<OrderedDishesService>(OrderedDishesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });





  describe('create', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          transaction: jest.fn().mockImplementation((callback) => callback({
            insert: jest.fn().mockReturnThis(),
            values: jest.fn().mockReturnThis(),
            returning: jest.fn().mockReturnValueOnce([
              {
                id: 44,
                id_user: 1,
                id_reservation: 1,
                id_dish: 1,
                paid: false
              }
            ]) as any,
            rollback: jest.fn().mockReturnThis(),
          })),
        }),
        ) as () => any,
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });


    it('should create data', async () => {
      const createDto: CreateOrderedDishDto[] = [
        {
          id_user: 1,
          id_reservation: 1,
          id_dish: 1,
          paid: false,
          removed_ingredients: [1, 2, 3]
        }
      ];
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [[
          {
            id: 44,
            id_user: 1,
            id_reservation: 1,
            id_dish: 1,
            paid: false
          }
        ]]
      };
      const result = await service.create(createDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      const createDto: CreateOrderedDishDto[] = [
        {
          id_user: 1,
          id_reservation: 1,
          id_dish: 1,
          paid: false,
          removed_ingredients: [1, 2, 3]
        }
      ];
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(createDto)).rejects.toThrow(InternalServerErrorException);
    });

  });




  describe('findAllByReservationId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 42,
                      id_ordered_dish: 42,
                      id_user: 2,
                      name_user: "Cliente",
                      surname_user: "Abituale",
                      id_reservation: 1,
                      id_dish: 1,
                      name_dish: "test",
                      image_dish: "asd",
                      price_dish: 14,
                      paid: true,
                      removed_ingredients: []
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: [{ id_ingredient: 1, name_ingredient: 'Updated Name' }]
          }
        ]
      };
      const mockRemovedIngredients = [
        { id_ingredient: 1, name_ingredient: 'Updated Name' }
      ];
      service.findRemovedIngredients = jest.fn().mockResolvedValue(mockRemovedIngredients);
      const result = await service.findAllByReservationId(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByReservationId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      await expect(service.findAllByReservationId(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });




  describe('findAllByUserId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 42,
                      id_ordered_dish: 42,
                      id_user: 2,
                      name_user: "Cliente",
                      surname_user: "Abituale",
                      id_reservation: 1,
                      id_dish: 1,
                      name_dish: "test",
                      image_dish: "asd",
                      price_dish: 14,
                      paid: true,
                      removed_ingredients: []
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: [{ id_ingredient: 1, name_ingredient: 'Updated Name' }]
          }
        ]
      };
      const mockRemovedIngredients = [
        { id_ingredient: 1, name_ingredient: 'Updated Name' }
      ];
      service.findRemovedIngredients = jest.fn().mockResolvedValue(mockRemovedIngredients);
      const result = await service.findAllByUserId(mockId, mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByUserId(mockId, mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllByUserId(mockWrongId, mockId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllByUserId(mockId, mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });






  describe('findAllUnpaidOrders', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 42,
                      id_ordered_dish: 42,
                      id_user: 2,
                      name_user: "Cliente",
                      surname_user: "Abituale",
                      id_reservation: 1,
                      id_dish: 1,
                      name_dish: "test",
                      image_dish: "asd",
                      price_dish: 14,
                      paid: true,
                      removed_ingredients: []
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: [{ id_ingredient: 1, name_ingredient: 'Updated Name' }]
          }
        ]
      };
      const mockRemovedIngredients = [
        { id_ingredient: 1, name_ingredient: 'Updated Name' }
      ];
      service.findRemovedIngredients = jest.fn().mockResolvedValue(mockRemovedIngredients);
      const result = await service.findAllUnpaidOrders(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllUnpaidOrders(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      await expect(service.findAllUnpaidOrders(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });





  describe('findAllUnpaidOrdersByUserId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 42,
                      id_ordered_dish: 42,
                      id_user: 2,
                      name_user: "Cliente",
                      surname_user: "Abituale",
                      id_reservation: 1,
                      id_dish: 1,
                      name_dish: "test",
                      image_dish: "asd",
                      price_dish: 14,
                      paid: true,
                      removed_ingredients: []
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: [{ id_ingredient: 1, name_ingredient: 'Updated Name' }]
          }
        ]
      };
      const mockRemovedIngredients = [
        { id_ingredient: 1, name_ingredient: 'Updated Name' }
      ];
      service.findRemovedIngredients = jest.fn().mockResolvedValue(mockRemovedIngredients);
      const result = await service.findAllUnpaidOrdersByUserId(mockId, mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllUnpaidOrdersByUserId(mockId, mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllUnpaidOrdersByUserId(mockWrongId, mockId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllUnpaidOrdersByUserId(mockId, mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });






  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 42,
                      id_ordered_dish: 42,
                      id_user: 2,
                      name_user: "Cliente",
                      surname_user: "Abituale",
                      id_reservation: 1,
                      id_dish: 1,
                      name_dish: "test",
                      image_dish: "asd",
                      price_dish: 14,
                      paid: true,
                      removed_ingredients: []
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: [{ id_ingredient: 1, name_ingredient: 'Updated Name' }]
          }
        ]
      };
      const mockRemovedIngredients = [
        { id_ingredient: 1, name_ingredient: 'Updated Name' }
      ];
      service.findRemovedIngredients = jest.fn().mockResolvedValue(mockRemovedIngredients);
      const result = await service.findOne(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      await expect(service.findOne(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });





  describe('findRemovedIngredients', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  { id_ingredient: 1, name_ingredient: 'Updated Name' }
                ]) as any
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = [{ id_ingredient: 1, name_ingredient: 'Updated Name' }];
      const result = await service.findRemovedIngredients(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findRemovedIngredients(mockId)).rejects.toThrow(InternalServerErrorException);
    });

  });





  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id: 42,
              id_ordered_dish: 42,
              id_user: 2,
              name_user: "Cliente",
              surname_user: "Abituale",
              id_reservation: 1,
              id_dish: 1,
              name_dish: "test",
              image_dish: "asd",
              price_dish: 14,
              paid: true,
              removed_ingredients: []
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;
    const updateDto: UpdateOrderedDishDto = {
      paid: false
    };

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockId, updateDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Update successful',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: []
          }
        ]
      };
      const result = await service.update(mockId, updateDto);
      expect(result).toEqual(expectedResult);
    });
  });





  describe('remove', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          delete: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id: 42,
              id_ordered_dish: 42,
              id_user: 2,
              name_user: "Cliente",
              surname_user: "Abituale",
              id_reservation: 1,
              id_dish: 1,
              name_dish: "test",
              image_dish: "asd",
              price_dish: 14,
              paid: true,
              removed_ingredients: []
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockWrongId, mockId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockId, mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(mockId, mockId)).rejects.toThrow(InternalServerErrorException);
    });

  });





  describe('reservationTotalBill', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue({
                  groupBy: jest.fn().mockReturnValue([
                    {
                      id_reservation: 2,
                      total_bill: "42"
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_reservation: 2,
            total_bill: "42"
          }
        ]
      };
      const result = await service.reservationTotalBill(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.reservationTotalBill(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      await expect(service.reservationTotalBill(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });






  describe('userTotalBill', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue({
                  groupBy: jest.fn().mockReturnValue([
                    {
                      id_reservation: 2,
                      id_user: 3,
                      total_bill: "42"
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_reservation: 2,
            id_user: 3,
            total_bill: "42"
          }
        ]
      };
      const result = await service.userTotalBill(mockId, mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.userTotalBill(mockId, mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      await expect(service.userTotalBill(mockWrongId, mockId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      await expect(service.userTotalBill(mockId, mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });





  describe('removeById', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          delete: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id: 42,
              id_ordered_dish: 42,
              id_user: 2,
              name_user: "Cliente",
              surname_user: "Abituale",
              id_reservation: 1,
              id_dish: 1,
              name_dish: "test",
              image_dish: "asd",
              price_dish: 14,
              paid: true,
              removed_ingredients: []
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.removeById(mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.removeById(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should remove data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted',
        data: [
          {
            id: 42,
            id_ordered_dish: 42,
            id_user: 2,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 1,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 14,
            paid: true,
            removed_ingredients: []
          }
        ]
      };
      const result = await service.removeById(mockId);
      expect(result).toEqual(expectedResult);
    });

  });





  describe('sendNotificationUpdate', () => {

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [ConfigModule],
        controllers: [OrderedDishesController],
        providers: [
          OrderedDishesService,
          ReservationsService,
          AuthorizationService,
          ConfigService,
          NotificationsService,
          UsersReservationsService,
          JwtService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OrderedDishesService>(OrderedDishesService);
      notificationsService = module.get<NotificationsService>(NotificationsService);
      reservationsService = module.get<ReservationsService>(ReservationsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should send notification', async () => {
      reservationsService.findOne = jest.fn().mockResolvedValue(
        {
          result: true,
          message: "Research successful",
          data: [
            {
              id: 1,
              id_restaurant: 1,
              date: "2024-04-05T08:30:00.000Z",
              partecipants: 12,
              reservation_state: "In attesa",
              bill_splitting_method: "Equidiviso",
              paid_orders: 5
            }
          ]
        }
      );
      notificationsService.create = jest.fn().mockResolvedValue(true);
      const result = await service.sendNotificationUpdate(mockId);
      expect(reservationsService.findOne).toHaveBeenCalled()
    });

    it('should throw InternalServerErrorException on create error', async () => {
      notificationsService.create = jest.fn().mockResolvedValue(InternalServerErrorException);
      await expect(service.sendNotificationUpdate(mockId)).rejects.toThrow(InternalServerErrorException);
    });

  });

});

