import { CustomerRepository } from '@/domain/repositories/customerRepository.interface';
import { OfferRepository } from '@/domain/repositories/offerRepository.interface';
import { VoucherRepository } from '@/domain/repositories/voucherRepository.interface';
import { VoucherModel } from '../domain/model';
import { createHash } from 'crypto';

export class GenerateVoucherCodes {
  constructor(
    private readonly voucherRepository: VoucherRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly offerRepository: OfferRepository,
  ) {}

  async execute(offerCodeId: number) {
    const offer = await this.offerRepository.findById(offerCodeId);
    const customers = await this.customerRepository.findAll();

    const vouchersToBeCreated: VoucherModel[] = [];

    customers.forEach((customer) => {
      const voucher = new VoucherModel();
      voucher.isUsed = false;
      voucher.code = this.generateVoucherCode(customer.email, offer.name);
      voucher.customer = customer;
      voucher.offer = offer;
      vouchersToBeCreated.push(voucher);
    });

    this.voucherRepository.bulkInsert(vouchersToBeCreated);
  }

  private generateVoucherCode(email: string, name: string) {
    const datePart = new Date().getTime().toString().slice(-4);

    const nameHash = createHash('sha256')
      .update(name)
      .digest('hex')
      .slice(0, 4);

    const emailHash = createHash('sha256')
      .update(email)
      .digest('hex')
      .slice(0, 4);

    return `${datePart}${nameHash}${emailHash}`;
  }
}
