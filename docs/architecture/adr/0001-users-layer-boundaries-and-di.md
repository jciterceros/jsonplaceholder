# ADR 0001: Users layer boundaries and DI contracts

## Status

Accepted

## Context

The `users` feature was incrementally migrated to a clean architecture layout:

- `presentation` for UI concerns
- `application` for orchestration (facade/use cases)
- `domain` for business contracts
- `infrastructure` for external details (HTTP, localStorage, mappers)

To avoid architecture drift over time, the project needs explicit guidance about:

1. which layer can import which layer;
2. how dependency inversion should be implemented in Angular DI;
3. where API DTOs and browser-specific persistence belong.

## Decision

1. **Dependency direction**
   - `domain` must not import `application`, `infrastructure`, or `presentation`.
   - `application` must not import `infrastructure` or `presentation`.
   - `presentation` must not import `infrastructure`.
   - `infrastructure` must not import `application` or `presentation`.

2. **DI contracts**
   - `domain` contracts are represented as abstract classes when used as Angular DI tokens.
   - Concrete implementations live in `infrastructure`.
   - Bindings are defined in `src/app/config/app.config.ts` using `useExisting`.

3. **Data model placement**
   - API transport models (`*Dto`) live in `infrastructure/api`.
   - Domain entities/models used by business logic stay in `domain`.

4. **Persistence placement**
   - Browser persistence details (for example, localStorage) are implemented in `infrastructure/repositories`.
   - `application` consumes them only via domain ports.

5. **Enforcement**
   - Layer boundary restrictions are enforced by ESLint (`no-restricted-imports`) in `eslint.config.js`.
   - Unit tests must cover application orchestration and infrastructure adapters.

## Consequences

### Positive

- Better compliance with SOLID (especially DIP).
- Lower coupling between orchestration and external implementations.
- Reduced regression risk via lint-enforced boundaries.
- Clearer onboarding and review criteria for future feature work.

### Trade-offs

- More files and explicit bindings in composition root.
- Boundary rules depend on folder conventions and must be updated when structure changes.

## Related artifacts

- `docs/architecture/feature-clean-architecture.md`
- `docs/architecture/pr-roadmap.md`
- `src/app/config/app.config.ts`
- `eslint.config.js`
