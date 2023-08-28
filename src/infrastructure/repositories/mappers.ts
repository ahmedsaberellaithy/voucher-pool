//this file contains mappers from and to map entities to models
import { Customer, Offer, Voucher } from '../entities';
import { CustomerModel, OfferModel, VoucherModel } from '../../domain/model';

export const mapCustomerToModel = (entity: Customer): CustomerModel => {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
  };
};

export const mapOfferToModel = (entity: Offer): OfferModel => {
  return {
    id: entity.id,
    name: entity.name,
    discountPercentage: entity.discount_percentage,
  };
};

export const mapVoucherToModel = (entity: Voucher): VoucherModel => {
  return {
    id: entity.id,
    code: entity.code,
    isUsed: entity.is_used,
    usedAt: entity.used_at,
    expirationDate: entity.expiration_date,
    customer: mapCustomerToModel(entity.customer),
    offer: mapOfferToModel(entity.offer),
  };
};

export const mapModelToCustomer = (model: CustomerModel): Customer => {
  return {
    id: model.id,
    name: model.name,
    email: model.email,
    created_date: new Date(),
    updated_date: new Date(),
  };
};

export const mapModelToOffer = (model: OfferModel): Offer => {
  return {
    id: model.id,
    name: model.name,
    discount_percentage: model.discountPercentage,
    created_date: new Date(),
    updated_date: new Date(),
  };
};

export const mapModelToVoucher = (model: VoucherModel): Voucher => {
  return {
    id: model.id,
    code: model.code,
    is_used: model.isUsed,
    used_at: model.usedAt,
    expiration_date: model.expirationDate,
    customer: mapModelToCustomer(model.customer),
    offer: mapModelToOffer(model.offer),
    created_date: new Date(),
    updated_date: new Date(),
  };
};
