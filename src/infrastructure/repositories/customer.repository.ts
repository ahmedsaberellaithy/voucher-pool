import { CustomerModel } from '@/domain/model/customer';
import { CustomerRepository } from '@/domain/repositories/customerRepository.interface';
import { Injectable } from '@nestjs/common';
import { Customer } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mapCustomerToModel, mapModelToCustomer } from './mappers';

@Injectable()
export class DatabaseCustomerRepository implements CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly customerEntityRepository: Repository<Customer>,
  ) {}

  async insert(customer: CustomerModel): Promise<void> {
    await this.customerEntityRepository.save(mapModelToCustomer(customer));
  }
  findAll(): Promise<CustomerModel[]> {
    return this.customerEntityRepository.find().then((entities) => {
      return entities.map((entity) => mapCustomerToModel(entity));
    });
  }

  async findByEmail(email: string): Promise<CustomerModel> {
    const entity = await this.customerEntityRepository.findOneOrFail({
      where: { email: email },
    });

    return mapCustomerToModel(entity);
  }
}
