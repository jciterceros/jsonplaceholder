import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import type { UserSummary } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/ports/users-repository';
import { GetUsersUseCase } from './get-users.use-case';

describe('GetUsersUseCase', () => {
  const users: UserSummary[] = [
    {
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
    },
  ];

  it('should load users through the repository abstraction', () => {
    const repositoryMock = {
      getUsers: () => of(users),
    };

    TestBed.configureTestingModule({
      providers: [
        GetUsersUseCase,
        {
          provide: UsersRepository,
          useValue: repositoryMock,
        },
      ],
    });

    const useCase = TestBed.inject(GetUsersUseCase);
    let result: UserSummary[] | undefined;

    useCase.execute().subscribe((loadedUsers) => {
      result = loadedUsers;
    });

    expect(result).toEqual(users);
  });
});
