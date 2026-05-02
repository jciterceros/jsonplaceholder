import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AppThemeService } from '../../../core/theme/app-theme.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  templateUrl: './site-nav.component.html',
  styleUrl: './site-nav.component.css',
})
export class SiteNavComponent {
  private readonly theme = inject(AppThemeService);

  protected readonly isDark = this.theme.isDark;
  protected readonly currentModeLabel = this.theme.currentModeLabel;
  protected readonly nextModeLabel = this.theme.nextModeLabel;

  protected onThemeToggle(): void {
    this.theme.toggle();
  }
}

