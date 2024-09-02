import { InMemoryDbService  } from 'angular-in-memory-web-api';
import { Client } from '../shared/models/client';

export class InMemoryDataService implements InMemoryDbService  {
  createDb() {
    const clients: Client[] = [
        { id: 1, firstName: 'John', lastName: 'Doe', gender: 'კაცი', personalNumber: '123456789', mobile: '555-1234', legalAddress: '123 Elm St', actualAddress: '123 Elm St' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', gender: 'ქალი', personalNumber: '987654321', mobile: '555-5678', legalAddress: '456 Oak St', actualAddress: '456 Oak St' },
        { id: 3, firstName: 'Michael', lastName: 'Johnson', gender: 'კაცი', personalNumber: '135792468', mobile: '555-9876', legalAddress: '789 Pine St', actualAddress: '789 Pine St' },
        { id: 4, firstName: 'Emily', lastName: 'Davis', gender: 'ქალი', personalNumber: '246813579', mobile: '555-4321', legalAddress: '101 Maple St', actualAddress: '101 Maple St' },
        { id: 5, firstName: 'Sarah', lastName: 'Wilson', gender: 'ქალი', personalNumber: '112233445', mobile: '555-6789', legalAddress: '202 Birch St', actualAddress: '202 Birch St' }
      ];
    return { clients };
  }
}
