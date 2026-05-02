import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  public readonly compact = input(false);
  public readonly currentModeLabel = input.required<string>();
  public readonly nextModeLabel = input.required<string>();
  public readonly isDark = input.required<boolean>();
  public readonly toggle = output<void>();

  public emitToggle(): void {
    this.toggle.emit();
  }
}
