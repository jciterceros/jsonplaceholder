# Ordem sugerida de PRs (alinhamento a estrutura alvo)

Pequenos PRs reduzem conflitos e facilitam revisao.

A numeracao abaixo segue a sequencia no **GitHub** apos a primeira PR ja aberta.

## PR #1 — concluida (referencia)

Titulo exemplo: `feat(users): migrate users to features module with lazy loading`

- Move codigo de users para `src/app/features/users` (domain, infrastructure, presentation).
- `AppComponent` como shell com `router-outlet`.
- `users.routes.ts` e lazy load em `app.routes.ts`.

_(Esta PR corresponde ao piloto users da Fase 1; numeros seguintes partem da #2.)_

## PR #2 — `core` (infra transversal)

- Criar `src/app/core/errors/` e `src/app/core/http/interceptors/`.
- Mover `ApiError` e `httpErrorInterceptor` a partir de `src/app/data/` (se ainda existirem).
- Atualizar imports em `app.config.ts` e consumidores (ex.: `UsersFacade`).
- Remover pastas vazias em `data/` se nao restarem ficheiros.

## PR #3 — `shared/ui` (reuso entre features)

- Mover `theme-toggle` de `src/app/presentation/components/` para `src/app/shared/ui/theme-toggle/`.
- Atualizar imports na feature `users` e no shell se necessario.

## PR #4 — API publica da feature `users`

- Adicionar `src/app/features/users/index.ts` exportando apenas o necessario (ex.: `USERS_ROUTES`, tokens ou simbolos publicos).

## PR #5 (opcional) — Domain ports e use cases

- Introduzir `UsersRepository` (porta), `GetUsersUseCase`, e implementacao em `infrastructure`.
- Ajustar `UsersFacade` para depender de use cases em vez de `UsersService` direto.

## PR #6 (opcional) — Pastas domain alinhadas ao doc

- `domain/models` → `domain/entities` (ou dividir entidade vs DTO de API).
- Mappers em `infrastructure/mappers/` conforme convencao do time.

## Referencia

- Estrutura alvo: [feature-clean-architecture.md](./feature-clean-architecture.md).
