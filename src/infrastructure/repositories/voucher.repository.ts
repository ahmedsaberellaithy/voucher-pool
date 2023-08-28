import { VoucherModel } from '@/domain/model/voucher';
import { VoucherRepository } from '@/domain/repositories/voucherRepository.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from '../entities/voucher.entity';
import { Repository } from 'typeorm';
import {
  mapModelToCustomer,
  mapModelToVoucher,
  mapVoucherToModel,
} from './mappers';
import { CustomerModel } from '@/domain/model/customer';

@Injectable()
export class DatabaseVoucherRepository implements VoucherRepository {
  constructor(
    @InjectRepository(Voucher)
    private readonly voucherEntityRepository: Repository<Voucher>,
  ) {}

  async insert(voucher: VoucherModel): Promise<void> {
    await this.voucherEntityRepository.save(mapModelToVoucher(voucher));
  }

  async bulkInsert(vouchers: VoucherModel[]): Promise<void> {
    await this.voucherEntityRepository.save(
      vouchers.map((voucher) => mapModelToVoucher(voucher)),
      { transaction: true },
    );
  }
  findAll(): Promise<VoucherModel[]> {
    return this.voucherEntityRepository.find().then((entities) => {
      return entities.map((entity) => mapVoucherToModel(entity));
    });
  }
  async findByCode(code: string): Promise<VoucherModel> {
    const entity = await this.voucherEntityRepository.findOneOrFail({
      where: { code: code },
    });

    return mapVoucherToModel(entity);
  }

  async useVoucherByCode(code: string): Promise<void> {
    const entity = await this.voucherEntityRepository.findOneOrFail({
      where: { code: code, is_used: false },
    });

    await this.voucherEntityRepository.update(
      { code: entity.code },
      { is_used: true, used_at: new Date() },
    );
  }

  findCustomerVouchers(customer: CustomerModel): Promise<VoucherModel[]> {
    return this.voucherEntityRepository
      .findBy({ customer: { id: mapModelToCustomer(customer).id } })
      .then((entities) => {
        return entities.map((entity) => mapVoucherToModel(entity));
      });
  }
}
