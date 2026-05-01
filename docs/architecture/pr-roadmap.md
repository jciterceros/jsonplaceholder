# Ordem sugerida de PRs (alinhamento a estrutura alvo)

Pequenos PRs reduzem conflitos e facilitam revisao.

A numeracao abaixo segue a sequencia no **GitHub** apos a primeira PR ja aberta.

## PR #1 — concluida (referencia)

- GitHub: [PR #1](https://github.com/jciterceros/jsonplaceholder/pull/1)

Titulo exemplo: `feat(users): migrate users to features module with lazy loading`

- Move codigo de users para `src/app/features/users` (domain, infrastructure, presentation).
- `AppComponent` como shell com `router-outlet`.
- `users.routes.ts` e lazy load em `app.routes.ts`.

_(Esta PR corresponde ao piloto users da Fase 1; numeros seguintes partem da #2.)_

## PR #2 — concluida — `core` (infra transversal)

- GitHub: [PR #2](https://github.com/jciterceros/jsonplaceholder/pull/2)

- Criar `src/app/core/errors/` e `src/app/core/http/interceptors/`.
- Mover `ApiError` e `httpErrorInterceptor` a partir de `src/app/data/` (se ainda existirem).
- Atualizar imports em `app.config.ts` e consumidores (ex.: `UsersFacade`).
- Remover pastas vazias em `data/` se nao restarem ficheiros.

## PR #3 — concluida — `shared/ui` (reuso entre features)

- GitHub: [PR #3](https://github.com/jciterceros/jsonplaceholder/pull/3)

- Mover `theme-toggle` de `src/app/presentation/components/` para `src/app/shared/ui/theme-toggle/`.
- Atualizar imports na feature `users` e no shell se necessario.

## PR #4 — concluida — API publica da feature `users`

- GitHub: [PR #4](https://github.com/jciterceros/jsonplaceholder/pull/4)

- Adicionar `src/app/features/users/index.ts` exportando apenas o necessario (ex.: `USERS_ROUTES`, tokens ou simbolos publicos).

## PR #5 — concluida — Domain ports e use cases

- GitHub: [PR #5](https://github.com/jciterceros/jsonplaceholder/pull/5)

- Introduzir `UsersRepository` (porta), `GetUsersUseCase`, e implementacao em `infrastructure`.
- Ajustar `UsersFacade` para depender de use cases em vez de `UsersService` direto.

## PR #6 — concluida — Pastas domain alinhadas ao doc

- GitHub: [PR #6](https://github.com/jciterceros/jsonplaceholder/pull/6)

- `domain/models` → `domain/entities` (ou dividir entidade vs DTO de API).
- Mappers em `infrastructure/mappers/` conforme convencao do time.

## PR #7 — concluida — DIP no use case de users

- GitHub: [PR #7](https://github.com/jciterceros/jsonplaceholder/pull/7)

- Tornar `UsersRepository` um token injetavel no dominio.
- Injetar a abstracao no `GetUsersUseCase` (sem dependencia direta de `UsersService`).
- Declarar binding em providers (`useExisting`) no `app.config.ts`.

## PR #8 — concluida — hardening de Clean Architecture

- GitHub: [PR #8](https://github.com/jciterceros/jsonplaceholder/pull/8)

- Mover contratos de API (`UserApiItemDto`) para `infrastructure/api`.
- Extrair persistencia de tema para `ThemePreferencesRepository` com implementacao em `infrastructure/repositories`.
- Adicionar testes de `application` para `GetUsersUseCase` e `UsersFacade`.
- Atualizar este roadmap com o estado mais recente das PRs.

## PR #9 — concluida — validacao de alinhamento arquitetural

- GitHub: [PR #9](https://github.com/jciterceros/jsonplaceholder/pull/9)

- Confirmar que `GetUsersUseCase` depende de abstracao (`UsersRepository`) em `src/app/features/users/application/use-cases/get-users.use-case.ts`.
- Confirmar bindings de abstracoes no composition root `src/app/config/app.config.ts` com `useExisting`.
- Confirmar DTO de API em `infrastructure/api` e dominio com `UserSummary` apenas.
- Confirmar persistencia de tema por porta (`ThemePreferencesRepository`) com implementacao em `infrastructure/repositories`.
- Confirmar cobertura de testes da camada `application`:
  - `GetUsersUseCase` (`src/app/features/users/application/use-cases/get-users.use-case.spec.ts`)
  - `UsersFacade` (`src/app/features/users/application/facades/users.facade.spec.ts`)
  - service e mapper (`src/app/features/users/infrastructure/**`)

## PR #10 — concluida — mitigacao de risco residual

- GitHub: [PR #10](https://github.com/jciterceros/jsonplaceholder/pull/10)

- Adicionar teste unitario dedicado para `LocalStorageThemePreferencesRepository`.
- Configurar regra de lint para fronteiras de import entre camadas (enforcement automatico).

## PR #11 — concluida — ADR de fronteiras e contratos de DI

- GitHub: [PR #11](https://github.com/jciterceros/jsonplaceholder/pull/11)

- Formalizar decisao arquitetural em ADR para fronteiras de camada e contratos de DI.
- Registrar regras de dependencia, alocacao de DTOs e estrategia de enforcement via lint.

## PR #12 — concluida — guias C4 e diagramas de sequencia

- GitHub: [PR #12](https://github.com/jciterceros/jsonplaceholder/pull/12)

- Adicionar estrutura de documentacao C4 em `docs/architecture/c4/`.
- Adicionar diagramas de sequencia em `docs/architecture/sequence/`.
- Integrar links de navegacao em `feature-clean-architecture.md`.

## PR #13 — concluida — rastreabilidade por links GitHub

- GitHub: [PR #13](https://github.com/jciterceros/jsonplaceholder/pull/13)

- Adicionar links diretos do GitHub (`PR #N -> URL`) em cada item do roadmap.
- Melhorar rastreabilidade entre planejamento e entregas versionadas.

## PR #14 — em andamento — setup Docker e Docker Compose

- GitHub: [PR #14](https://github.com/jciterceros/jsonplaceholder/pull/14)

- Adicionar `Dockerfile` multi-stage para build Angular e runtime com Nginx.
- Adicionar `docker-compose.yml` (producao local) e `docker-compose.dev.yml` (dev server).
- Adicionar scripts npm para build/up/down/logs dos ambientes Docker.

## Referencia

- Estrutura alvo: [feature-clean-architecture.md](./feature-clean-architecture.md).
- ADR 0001: [users-layer-boundaries-and-di](./adr/0001-users-layer-boundaries-and-di.md)
- C4: [indice C4](./c4/README.md)
- Sequence: [indice de diagramas de sequencia](./sequence/README.md)
