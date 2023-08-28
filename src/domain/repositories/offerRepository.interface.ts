import { OfferModel } from '../model/offer';

export interface OfferRepository {
  insert(offer: OfferModel): Promise<void>;
  findAll(): Promise<OfferModel[]>;
  findById(id: number): Promise<OfferModel>;
}
