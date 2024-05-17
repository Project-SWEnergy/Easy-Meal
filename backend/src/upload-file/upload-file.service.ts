import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from 'src/authentication/dto/user-data.dto';


@Injectable()
export class UploadFileService {

	uploadImage(file: any, userId: number, userType: UserType): string {
		if (!Number.isInteger(userId))
			throw new BadRequestException("Invalid dish ID");
		const uploadPath = `./resources/${userType}/${userId}/`;

		// Controlla se la directory esiste, in caso negativo la crea
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath, { recursive: true });
		}

		const randomName = uuidv4();
		const fileName = `${randomName}${extname(file.originalname)}`;
		const filePath = uploadPath + fileName
		try {
			fs.writeFileSync(filePath, file.buffer);
		}
		catch (error) {
			console.error(error)
			throw new InternalServerErrorException('File not saved');
		}
		return filePath;
	}

	removeImage(filePath: string): void {
		fs.unlink(filePath, (err) => {
			if (err) {
				console.error(err)
				throw new InternalServerErrorException('File not deleted');
			}
		})
	}

}
