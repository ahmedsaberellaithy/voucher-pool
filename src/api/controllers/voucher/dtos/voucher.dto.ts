import { VoucherModel } from '@/domain/model/voucher';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class VoucherDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly code: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly expirationDate: Date;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isUsed: boolean;
  @ApiProperty()
  @IsDate()
  usedAt: Date;

  // other properties
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  customerEmail: String;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discountPercentage: number;

  constructor(voucher: VoucherModel) {
    this.code = voucher.code;
    this.expirationDate = voucher.expirationDate;
    this.isUsed = voucher.isUsed;
    this.usedAt = voucher.usedAt;
    this.customerEmail = voucher.customer.email;
    this.discountPercentage = voucher.offer.discountPercentage;
  }
}
