import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { AppComponent } from './app.component';

const MOCK_USERS_API = [
  {
    id: 1,
    name: 'Test User',
    username: 'test',
    email: 't@t.com',
    address: {
      street: 's',
      suite: 's',
      city: 'c',
      zipcode: 'z',
      geo: { lat: '0', lng: '0' },
    },
    phone: '1',
    website: 't.com',
    company: { name: 'Co', catchPhrase: '', bs: '' },
  },
];

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/users`);
    req.flush(MOCK_USERS_API);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('JSONPlaceholder Users');
    httpMock.verify();
  });
});
