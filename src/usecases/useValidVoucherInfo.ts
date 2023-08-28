import { CustomerRepository } from '@/domain/repositories/customerRepository.interface';
import { VoucherRepository } from '@/domain/repositories/voucherRepository.interface';
import { VoucherModel } from '../domain/model';

export class GetValidVoucherInfo {
  constructor(private readonly voucherRepository: VoucherRepository) {}

  async execute(voucherCode: string, email: string): Promise<VoucherModel> {
    const voucher = await this.voucherRepository.findByCode(voucherCode);

    if (voucher.customer?.email !== email) {
      throw new Error("Invalid Voucher Code, email doesn't match");
    }
    if (voucher.isUsed) {
      throw new Error('Invalid Voucher Code, voucher is used before');
    }
    await this.voucherRepository.useVoucherByCode(voucherCode);

    return voucher;
  }
}
