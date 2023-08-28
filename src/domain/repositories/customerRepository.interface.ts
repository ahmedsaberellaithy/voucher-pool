import { CustomerModel } from '../model/customer';

export interface CustomerRepository {
  insert(customer: CustomerModel): Promise<void>;
  findAll(): Promise<CustomerModel[]>;
  findByEmail(email: string): Promise<CustomerModel>;
}
