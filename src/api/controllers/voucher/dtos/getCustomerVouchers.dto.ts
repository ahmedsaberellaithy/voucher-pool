import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetCustomerVouchers {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email: String;
}
