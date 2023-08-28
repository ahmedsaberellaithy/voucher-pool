import { CustomerModel } from './customer';
import { OfferModel } from './offer';

export class VoucherModel {
  id: number;
  isUsed: boolean;
  usedAt: Date;
  expirationDate: Date;
  code: string;
  customer: CustomerModel;
  offer: OfferModel;
}
