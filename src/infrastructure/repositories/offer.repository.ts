import { OfferModel } from '@/domain/model/offer';
import { OfferRepository } from '@/domain/repositories/offerRepository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entities';
import { Repository } from 'typeorm';
import { mapModelToOffer, mapOfferToModel } from './mappers';

export class DatabaseOfferRepository implements OfferRepository {
  constructor(
    @InjectRepository(Offer)
    private readonly offerEntityRepository: Repository<Offer>,
  ) {}

  async insert(offer: OfferModel): Promise<void> {
    this.offerEntityRepository.save(mapModelToOffer(offer));
  }
  findAll(): Promise<OfferModel[]> {
    return this.offerEntityRepository.find().then((entities) => {
      return entities.map((entity) => mapOfferToModel(entity));
    });
  }

  async findById(id: number): Promise<OfferModel> {
    const offerEntity = await this.offerEntityRepository.findOneOrFail({
      where: { id: id },
    });
    return mapOfferToModel(offerEntity);
  }
}
