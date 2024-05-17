import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationService } from '../authorization/authorization.service';
import { JwtService } from '@nestjs/jwt';
import { AllergiesController } from './allergies.controller';
import { AllergiesService } from './allergies.service';
import { CreateAllergyDto } from './dto/create-allergy.dto';
import { ResultAllergyDto } from './dto/result-allergy.dto';
import { UpdateAllergyDto } from './dto/update-allergy.dto';

jest.mock('../database/database.service');
jest.mock('./allergies.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');


describe('AllergiesController', () => {
	let controller: AllergiesController;
	let allergiesService: AllergiesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AllergiesController],
			providers: [AllergiesService, AuthorizationService, JwtService],
		}).compile();
		controller = module.get<AllergiesController>(AllergiesController);
		allergiesService = module.get<AllergiesService>(AllergiesService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {

		it('should create a new allergies and return a response with status 200', async () => {
			const createAllergyDto: CreateAllergyDto = {
				name: "test",
				icon: "test"
			};
			const expectedResult: ResultAllergyDto = {
				result: true,
				message: 'Successfully created',
				data: [
					{
						id: 1,
						name: "test",
						icon: "test"
					}
				]
			};
			jest.spyOn(allergiesService, 'create').mockResolvedValue(expectedResult);
			const result = await controller.create(createAllergyDto);
			expect(result).toEqual(expectedResult);
			expect(allergiesService.create).toHaveBeenCalledWith(createAllergyDto);
		});
	});

	describe('findOne', () => {

		it('should return the allergies with status 200 if authorized', async () => {
			const id = '1';
			const mockResult: ResultAllergyDto = {
				result: true,
				message: 'Mocked allergies found',
				data: [
					{
						id: 1,
						name: "test",
						icon: "test"
					}
				]
			};
			jest.spyOn(allergiesService, 'findOne').mockResolvedValueOnce(mockResult);
			const result = await controller.findOne(id);
			expect(result).toEqual(mockResult);
			expect(allergiesService.findOne).toHaveBeenCalledWith(parseInt(id));
		});
	});

	describe('findAll', () => {

		it('should return allergies with status 200 for the given restaurant ID', async () => {
			const mockResult: ResultAllergyDto = {
				result: true,
				message: 'Mocked allergies found',
				data: [
					{
						id: 1,
						name: "test",
						icon: "test"
					}
				]
			};
			jest.spyOn(allergiesService, 'findAll').mockResolvedValueOnce(mockResult);
			const result = await controller.findAll();
			expect(result).toEqual(mockResult);
			expect(allergiesService.findAll).toHaveBeenCalledWith();
		});
	});

	describe('update', () => {

		it('should update the allergies and return a response with status 200 if authorized', async () => {
			// Arrange
			const mockId = '1';
			const mockUpdateAllergyDto: UpdateAllergyDto = {
				name: "test",
				icon: "test"
			};
			const mockResult: ResultAllergyDto = {
				result: true,
				message: 'Mocked allergies updated',
				data: [{
					id: 1,
					name: "test",
					icon: "test"
				}]
			};
			jest.spyOn(allergiesService, 'update').mockResolvedValueOnce(mockResult);
			const result = await controller.update(mockId, mockUpdateAllergyDto);
			expect(result).toEqual(mockResult);
			expect(allergiesService.update).toHaveBeenCalledWith(parseInt(mockId), mockUpdateAllergyDto);
		});

	});

	describe('remove', () => {

		it('should remove the allergies and return a response with status 200 if authorized', async () => {
			const mockId = '1';
			const mockResult: ResultAllergyDto = {
				result: true,
				message: 'Mocked allergies removed',
				data: [{
					id: 1,
					name: "test",
					icon: "test"
				}]
			};
			jest.spyOn(allergiesService, 'remove').mockResolvedValueOnce(mockResult);
			const result = await controller.remove(mockId);
			expect(result).toEqual(mockResult);
			expect(allergiesService.remove).toHaveBeenCalledWith(parseInt(mockId));
		});

	});
}
);
