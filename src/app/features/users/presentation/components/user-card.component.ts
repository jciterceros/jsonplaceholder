import { Component, input } from '@angular/core';

import type { UserSummary } from '../../domain/entities/user.entity';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {
  public readonly user = input.required<UserSummary>();
}
