import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-resource-stub-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="stub">
      <h1>{{ title }}</h1>
      <p class="stub__hint">Esta rota será preenchida pela feature correspondente.</p>
      <a routerLink="/" class="stub__link">Início</a>
    </main>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      }
      .stub {
        margin: 0 auto;
        max-width: 40rem;
        min-height: 70vh;
        padding: 1rem;
      }
      h1 {
        font-size: 1.35rem;
        margin: 0 0 0.75rem;
      }
      .stub__hint {
        color: #64748b;
        margin: 0 0 1.25rem;
      }
      .stub__link {
        color: #0d9488;
        font-weight: 600;
        text-decoration: none;
      }
      .stub__link:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class ResourceStubPageComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = (this.route.snapshot.data['title'] as string) ?? 'Recurso';
}
