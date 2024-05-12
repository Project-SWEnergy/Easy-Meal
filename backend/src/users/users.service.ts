import { BadRequestException, Injectable, InternalServerErrorException, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { users } from '../../db/schema';
import * as argon from 'argon2';
import { ResultUserDto } from './dto/result-user.dto';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<ResultUserDto> {
    const database = this.databaseService.getDatabase();
    const password = createUserDto.password
    const passwordHash = await argon.hash(createUserDto.password);
    createUserDto.password = passwordHash;
    let createdUser: any;
    try {
      createdUser = await database
        .insert(users)
        .values(createUserDto)
        .returning();
    }
    catch (error) {
      console.error(error.message)
      throw new InternalServerErrorException("User creation error")
    }
    createdUser[0].password = password
    return {
      result: true,
      message: "Successfully created: user",
      data: createdUser
    }
  }


  async findOne(userId: number): Promise<ResultUserDto> {
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid user ID");
    const database = this.databaseService.getDatabase();
    let foundUser: any;
    try {
      foundUser = await database
        .select({
          id: users.id,
          name: users.name,
          surname: users.surname,
          email: users.email
        })
        .from(users)
        .where(eq(users.id, userId));
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Research successfull",
      data: foundUser
    }
  }


  async update(updateUserDto: UpdateUserDto, userId: number): Promise<ResultUserDto> {
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid user ID");
    const database = this.databaseService.getDatabase();
    const passwordHash = await argon.hash(updateUserDto.password);
    updateUserDto.password = passwordHash;
    let modifiedUser: any;
    try {
      modifiedUser = await database
        .update(users)
        .set({
          name: updateUserDto.name,
          surname: updateUserDto.surname,
          email: updateUserDto.email,
          password: updateUserDto.password
        })
        .where(eq(users.id, userId))
        .returning({
          id: users.id,
          name: users.name,
          surname: users.surname,
          email: users.email
        });
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully updated: user",
      data: modifiedUser
    }

  }


  async remove(userId: number): Promise<ResultUserDto> {
    if (!Number.isInteger(userId))
      throw new BadRequestException("Invalid user ID");
    const database = await this.databaseService.getDatabase();
    let deletedUser: any;
    try {
      deletedUser = await database
        .delete(users)
        .where(eq(users.id, userId))
        .returning({
          id: users.id,
          name: users.name,
          surname: users.surname,
          email: users.email
        });
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully deleted: user",
      data: deletedUser
    }
  }
}
