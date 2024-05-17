import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { DatabaseService } from '../database/database.service';
import { tags } from '../../db/schema';
import { ResultTagDto } from './dto/result-tag.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class TagsService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  async findAll(): Promise<ResultTagDto> {
    const database = this.databaseService.getDatabase();
    let foundTags: any;
    try {
      foundTags = await database
        .select({
          id: tags.id,
          name: tags.name,
          description: tags.description
        })
        .from(tags)
        .execute();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully found",
      data: foundTags
    }
  }


  async findOne(tagId: number): Promise<ResultTagDto> {
    if (!Number.isInteger(tagId))
      throw new BadRequestException("Invalid ID");
    const database = this.databaseService.getDatabase();
    let foundTag: any;
    try {
      foundTag = await database
        .select({
          id: tags.id,
          name: tags.name,
          description: tags.description
        })
        .from(tags)
        .where(eq(tags.id, tagId))
        .execute();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully found",
      data: foundTag
    }
  }

  async findByName(nameId: string): Promise<ResultTagDto> {
    const database = this.databaseService.getDatabase();
    let foundTag: any;
    try {
      foundTag = await database
        .select({
          id: tags.id,
          name: tags.name,
          description: tags.description
        })
        .from(tags)
        .where(eq(tags.name, nameId))
        .execute();
    }
    catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message)
    }
    return {
      result: true,
      message: "Successfully found",
      data: foundTag
    }
  }
}
