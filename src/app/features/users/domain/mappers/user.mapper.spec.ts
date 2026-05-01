import type { UserApiItem } from '../models/user.model';
import { mapUserApiItemToSummary } from './user.mapper';

describe('mapUserApiItemToSummary', () => {
  it('should map a UserApiItem into UserSummary', () => {
    const apiUser: UserApiItem = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496',
        },
      },
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };

    const summary = mapUserApiItemToSummary(apiUser);

    expect(summary).toEqual({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874',
      lat: '-37.3159',
      lng: '81.1496',
      companyName: 'Romaguera-Crona',
      companyCatchPhrase: 'Multi-layered client-server neural-net',
      companyBs: 'harness real-time e-markets',
    });
  });
});
