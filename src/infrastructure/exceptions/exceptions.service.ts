import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  IException,
  IFormatExceptionMessage,
} from '../../domain/exceptions/exceptions.interface';

@Injectable()
export class ExceptionsService implements IException {
  badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: IFormatExceptionMessage): void {
    throw new InternalServerErrorException(data);
  }
}
