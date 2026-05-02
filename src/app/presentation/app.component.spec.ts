import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ThemePreferencesRepository } from '../core/theme/theme-preferences-repository';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        {
          provide: ThemePreferencesRepository,
          useValue: {
            readMode: (): 'dark' | 'light' | null => null,
            saveMode: (): void => undefined,
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
