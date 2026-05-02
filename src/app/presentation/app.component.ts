import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppThemeService } from '../core/theme/app-theme.service';
import { SiteFooterComponent } from '../shared/ui/site-footer/site-footer.component';
import { SiteNavComponent } from '../shared/ui/site-nav/site-nav.component';

@Component({
  imports: [RouterOutlet, SiteNavComponent, SiteFooterComponent],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public constructor() {
    inject(AppThemeService).init();
  }
}

