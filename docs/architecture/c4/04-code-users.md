# C4 Level 4 — Code (feature users)

Este nivel mostra fluxos de codigo relevantes da feature `users`.

## Fluxo 1: carregar usuarios

1. `UsersPageComponent` chama `UsersFacade.init()` no `ngOnInit`.
2. `UsersFacade` dispara `usersResource` usando `GetUsersUseCase.execute()`.
3. `GetUsersUseCase` depende da abstracao `UsersRepository`.
4. `UsersService` implementa `UsersRepository`, chama a API e mapeia `UserApiItemDto -> UserSummary`.

## Fluxo 2: alternar tema

1. `UsersPageComponent` dispara `toggleMode()`.
2. `UsersFacade` alterna `mode` local (signal).
3. `UsersFacade` persiste via `ThemePreferencesRepository.saveMode()`.
4. `LocalStorageThemePreferencesRepository` salva o valor em `localStorage`.

## Pontos de verificacao

- Casos de uso e facade cobertos por testes de `application`.
- Mappers e services cobertos por testes de `infrastructure`.
- Fronteiras de camada reforcadas por regras de lint.
