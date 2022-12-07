// To create a service use the commad nest g pipe <folder-name>/<service-name>
// If you add the flag --flat the file will not be created in a folder inside the directory of the previous comand
import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new HttpException(
        `${value} needs to be a number`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
