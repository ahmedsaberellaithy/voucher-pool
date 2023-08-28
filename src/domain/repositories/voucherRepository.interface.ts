import { CustomerModel } from '../model';
import { VoucherModel } from '../model/voucher';

export interface VoucherRepository {
  insert(voucher: VoucherModel): Promise<void>;
  bulkInsert(vouchers: VoucherModel[]): Promise<void>;
  findAll(): Promise<VoucherModel[]>;
  findCustomerVouchers(customer: CustomerModel): Promise<VoucherModel[]>;
  findByCode(code: string): Promise<VoucherModel>;
  useVoucherByCode(code: string): Promise<void>;
}
