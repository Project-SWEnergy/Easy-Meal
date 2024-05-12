import { Test, TestingModule } from '@nestjs/testing';
import { BillsService } from './bills.service';
import { DatabaseService } from '../database/database.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { BillsController } from './bills.controller';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';
import { OrderedDishesService } from '../ordered-dishes/ordered-dishes.service';
import { TransactionLogsService } from '../transaction-logs/transaction-logs.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ReservationsService } from '../reservations/reservations.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UserType } from '../authentication/dto/user-data.dto';


jest.mock('../database/database.service');
jest.mock('../authorization/authorization.service');
jest.mock('../reservations/reservations.service');
jest.mock('../ordered-dishes/ordered-dishes.service');
jest.mock('../transaction-logs/transaction-logs.service');
jest.mock('../notifications/notifications.service');

describe('BillsService', () => {
  let service: BillsService;
  let databaseServiceMock: Partial<DatabaseService>;
  let reservationsService: Partial<ReservationsService>;
  let notificationsService: Partial<NotificationsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule
      ],
      controllers: [BillsController],
      providers: [
        BillsService,
        TransactionLogsService,
        OrderedDishesService,
        ReservationsService,
        NotificationsService,
        UsersReservationsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<BillsService>(BillsService);
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
                id: 38,
                id_user: 1,
                id_reservation: 1,
                date: "2024-04-05T08:30:00.000Z",
                total_bill: 12.45,
                bill_state: "Concluso"
              }
            ]) as any,
            rollback: jest.fn().mockReturnThis(),
          })),
        }),
        ) as () => any,
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
    });


    it('should create data', async () => {
      const createDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 12.45,
        bill_state: "In corso",
        id_ordered_dishes: [42, 43]
      };
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 38,
            id_user: 1,
            id_reservation: 1,
            date: "2024-04-05T08:30:00.000Z",
            total_bill: 12.45,
            bill_state: "Concluso",
            bill_details: [
              undefined,
              undefined
            ]
          }
        ]
      };
      const result = await service.create(createDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      const createDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 12.45,
        bill_state: "In corso",
        id_ordered_dishes: [42, 43]
      };
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(createDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id_reservation error', async () => {
      const createDto = {
        id_user: 1,
        id_reservation: 1.1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 12.45,
        bill_state: "In corso",
        id_ordered_dishes: [42, 43]
      };
      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on id_user error', async () => {
      const createDto = {
        id_user: 1.1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 12.45,
        bill_state: "In corso",
        id_ordered_dishes: [42, 43]
      };
      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on bill_state error', async () => {
      const createDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 12.45,
        bill_state: "In asd",
        id_ordered_dishes: [42, 43]
      };
      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });
  });



  describe('findAllByReservationId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn((params: any) => {
            const { id, id_user, name_user, surname_user, id_reservation, date, total_bill, bill_state } = params;
            if (params.surname_user) {
              return {
                from: jest.fn().mockReturnValue({
                  leftJoin: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue([
                      {
                        id: 1,
                        id_user: 1,
                        name_user: "user",
                        surname_user: "user",
                        id_reservation: 1,
                        date: "2024-04-05T08:30:00.000Z",
                        total_bill: 12.45,
                        bill_state: "Concluso"
                      }
                    ]) as any
                  })
                })
              };
            } else {
              return {
                from: jest.fn().mockReturnValue({
                  leftJoin: jest.fn().mockReturnValue({
                    leftJoin: jest.fn().mockReturnValue({
                      where: jest.fn().mockReturnValue([
                        {
                          id: 1,
                          id_ordered_dish: 1,
                          name_ordered_dish: "dishes.name",
                          price_ordered_dish: "dishes.price",
                          id_bill: 1
                        }
                      ]) as any
                    })
                  })
                })
              };
            }
          })
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
    });


    const mockId = 1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 1,
            id_user: 1,
            name_user: "user",
            surname_user: "user",
            id_reservation: 1,
            date: "2024-04-05T08:30:00.000Z",
            total_bill: 12.45,
            bill_state: "Concluso",
            bill_details: [
              {
                id: 1,
                id_bill: 1,
                id_ordered_dish: 1,
                name_ordered_dish: "dishes.name",
                price_ordered_dish: "dishes.price"
              }
            ]
          }
        ]
      };
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
      await expect(service.findAllByReservationId(1.1)).rejects.toThrow(BadRequestException);
    });

  });



  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn((params: any) => {
            const { id, id_user, name_user, surname_user, id_reservation, date, total_bill, bill_state } = params;
            if (params.surname_user) {
              return {
                from: jest.fn().mockReturnValue({
                  leftJoin: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue([
                      {
                        id: 1,
                        id_user: 1,
                        name_user: "user",
                        surname_user: "user",
                        id_reservation: 1,
                        date: "2024-04-05T08:30:00.000Z",
                        total_bill: 12.45,
                        bill_state: "Concluso"
                      }
                    ]) as any
                  })
                })
              };
            } else {
              return {
                from: jest.fn().mockReturnValue({
                  leftJoin: jest.fn().mockReturnValue({
                    leftJoin: jest.fn().mockReturnValue({
                      where: jest.fn().mockReturnValue([
                        {
                          id: 1,
                          id_ordered_dish: 1,
                          name_ordered_dish: "dishes.name",
                          price_ordered_dish: "dishes.price",
                          id_bill: 1
                        }
                      ]) as any
                    })
                  })
                })
              };
            }
          })
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
    });


    const mockId = 1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 1,
            id_user: 1,
            name_user: "user",
            surname_user: "user",
            id_reservation: 1,
            date: "2024-04-05T08:30:00.000Z",
            total_bill: 12.45,
            bill_state: "Concluso",
            bill_details: [
              {
                id: 1,
                id_bill: 1,
                id_ordered_dish: 1,
                name_ordered_dish: "dishes.name",
                price_ordered_dish: "dishes.price"
              }
            ]
          }
        ]
      };
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
      await expect(service.findOne(1.1)).rejects.toThrow(BadRequestException);
    });

  });



  describe('didUserPaidOnce', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  {
                    id_allergy: 1,
                    id_ingredient: 1
                  }
                ]) as any
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
    });

    const mockIdUser = 1;
    const mockIdRestaurant = 1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: true
      };
      const result = await service.didUserPaidOnce(mockIdUser, mockIdRestaurant);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.didUserPaidOnce(mockIdUser, mockIdRestaurant)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id user error', async () => {
      await expect(service.didUserPaidOnce(1.1, mockIdRestaurant)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on id restaurant error', async () => {
      await expect(service.didUserPaidOnce(mockIdUser, 1.1)).rejects.toThrow(BadRequestException);
    });

  });



  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id: 7,
              id_user: 1,
              id_reservation: 2,
              date: "2024-04-05T08:30:00.000Z",
              total_bill: 12.55,
              bill_state: "In corso"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;
    const updateDto = {
      total_bill: 12.55,
      bill_state: "In corso"
    };
    const wrongUpdateDto = {
      total_bill: 12.55,
      bill_state: "asd"
    };

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for invalid state', async () => {
      await expect(service.update(mockId, wrongUpdateDto)).rejects.toThrow(BadRequestException);
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
            id: 7,
            id_user: 1,
            id_reservation: 2,
            date: "2024-04-05T08:30:00.000Z",
            total_bill: 12.55,
            bill_state: "In corso"
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
              id: 7,
              id_user: 1,
              id_reservation: 2,
              date: "2024-04-05T08:30:00.000Z",
              total_bill: 12.55,
              bill_state: "In corso"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted',
        data: [
          {
            id: 7,
            id_user: 1,
            id_reservation: 2,
            date: "2024-04-05T08:30:00.000Z",
            total_bill: 12.55,
            bill_state: "In corso"
          }
        ]
      };
      const result = await service.remove(mockId);
      expect(result).toEqual(expectedResult);
    });
  });



  describe('sendNotificationUpdate', () => {
    let service: BillsService;
    let reservationsService: Partial<ReservationsService>;
    let notificationsService: NotificationsService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [BillsController],
        providers: [
          BillsService,
          TransactionLogsService,
          OrderedDishesService,
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<BillsService>(BillsService);
      reservationsService = module.get<ReservationsService>(ReservationsService);
      notificationsService = module.get<NotificationsService>(NotificationsService);
    });

    it('should throw InternalServerErrorException if an error occurs', async () => {
      // Sovrascrivi l'implementazione del metodo findOne del servizio di prenotazioni per sollevare un'eccezione
      (reservationsService.findOne as jest.Mock).mockRejectedValue(new InternalServerErrorException('Database error'));

      // Chiamata alla funzione di invio notifica e assicurati che sollevi l'eccezione corretta
      await expect(service.sendNotificationUpdate(1, 1)).rejects.toThrow(InternalServerErrorException);
    });
  });



});
