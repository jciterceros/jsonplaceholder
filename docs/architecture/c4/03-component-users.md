# C4 Level 3 — Components (feature users)

Este diagrama detalha os principais componentes da feature `users` por camada.

```mermaid
flowchart TD
  subgraph Presentation
    UsersPage["UsersPageComponent"]
    UserCard["UserCardComponent"]
    ThemeToggle["ThemeToggleComponent (shared/ui)"]
  end

  subgraph Application
    Facade["UsersFacade"]
    UseCase["GetUsersUseCase"]
  end

  subgraph Domain
    UsersRepo["UsersRepository (port)"]
    ThemeRepo["ThemePreferencesRepository (port)"]
    UserSummary["UserSummary"]
  end

  subgraph Infrastructure
    UsersService["UsersService"]
    ThemeLocal["LocalStorageThemePreferencesRepository"]
    Mapper["user.mapper"]
    Dto["UserApiItemDto"]
  end

  UsersPage --> Facade
  UserCard --> UserSummary
  ThemeToggle --> UsersPage

  Facade --> UseCase
  Facade --> ThemeRepo
  UseCase --> UsersRepo

  UsersService -. implements .-> UsersRepo
  ThemeLocal -. implements .-> ThemeRepo

  UsersService --> Dto
  UsersService --> Mapper
  Mapper --> UserSummary
```

## Regras de dependencia aplicadas

- `presentation -> application -> domain`
- `infrastructure -> domain`
- `application` nao importa implementacoes de `infrastructure`
