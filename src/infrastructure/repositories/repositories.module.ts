import { Module } from '@nestjs/common';
import { Customer, Voucher, Offer } from '../entities';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseCustomerRepository } from './customer.repository';
import { DatabaseVoucherRepository } from './voucher.repository';
import { DatabaseOfferRepository } from './offer.repository';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Voucher, Customer, Offer]),
  ],
  providers: [
    DatabaseCustomerRepository,
    DatabaseVoucherRepository,
    DatabaseOfferRepository,
  ],
  exports: [
    DatabaseCustomerRepository,
    DatabaseVoucherRepository,
    DatabaseOfferRepository,
  ],
})
export class RepositoriesModule {}
