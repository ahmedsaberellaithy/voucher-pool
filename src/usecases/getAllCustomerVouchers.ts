import { CustomerRepository } from '@/domain/repositories/customerRepository.interface';
import { VoucherRepository } from '@/domain/repositories/voucherRepository.interface';
import { VoucherModel } from '../domain/model';

export class GetAllCustomerVouchers {
  constructor(
    private readonly voucherRepository: VoucherRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async execute(email: string): Promise<VoucherModel[]> {
    const customer = await this.customerRepository.findByEmail(email);

    const vouchers = await this.voucherRepository.findCustomerVouchers(
      customer,
    );

    return vouchers;
  }
}
