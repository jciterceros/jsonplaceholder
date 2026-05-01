# Resource Template

Use este template sempre que um novo resource da JSONPlaceholder for entrar no projeto.

## 1) Estrutura de pastas

```text
src/app/features/<resource>/
  domain/
    entities/
      <resource>.entity.ts
    repositories/
      <resource>.repository.ts
    use-cases/
      get-<resource>-list.use-case.ts
      get-<resource>-by-id.use-case.ts
  application/
    facades/
      <resource>.facade.ts
    dto/
      <resource>.dto.ts
  infrastructure/
    api/
      <resource>.api.ts
      <resource>.repository.impl.ts
    mappers/
      <resource>.mapper.ts
  presentation/
    pages/
      <resource>-list.page.ts
      <resource>-detail.page.ts
    components/
      <resource>-card.component.ts
    store/
      <resource>.store.ts
    <resource>.routes.ts
  index.ts
```

## 2) Sequencia de implementacao recomendada

1. Criar `entity` e contrato de `repository` no dominio.
2. Criar `use-cases` minimos (`list` e `by-id`).
3. Implementar `api`, `mapper` e `repository.impl` na infraestrutura.
4. Criar `facade` para coordenar use cases e estado.
5. Implementar pagina/listagem da feature.
6. Registrar `routes` lazy e exportar API publica em `index.ts`.
7. Cobrir testes unitarios e de integracao leve.

## 3) Checklist de definicao pronta

- [ ] Domain nao importa Angular nem `HttpClient`.
- [ ] Infrastructure depende somente de portas de `domain`.
- [ ] Presentation nao acessa API diretamente.
- [ ] DTOs nao vazam para o dominio.
- [ ] Mapper cobre transformacoes e defaults.
- [ ] Estados de loading/erro/vazio definidos na facade/store.
- [ ] Rotas da feature estao isoladas em `<resource>.routes.ts`.

## 4) Criterios para promover para `shared`

Um item so deve ser movido para `shared` quando:

- for usado por pelo menos 2 features;
- nao carregar regra de negocio de um dominio especifico;
- tiver interface estavel e testes.

## 5) Convencoes de nomenclatura

- Arquivos:
  - `*.entity.ts`
  - `*.repository.ts`
  - `*.repository.impl.ts`
  - `*.use-case.ts`
  - `*.facade.ts`
  - `*.api.ts`
  - `*.mapper.ts`
- Classes:
  - `<Resource>Entity`
  - `<Resource>Repository`
  - `Get<Resource>ListUseCase`
  - `<Resource>Facade`

## 6) Exemplo de backlog por resource

### Exemplo: `posts`

- [ ] Listagem de posts com paginação.
- [ ] Filtro por `userId`.
- [ ] Detalhe de post.
- [ ] Relacao post -> comments (navegacao).
- [ ] Testes de facade e use cases.

### Exemplo: `photos` (alto volume)

- [ ] Paginação server-side.
- [ ] Virtual scroll na lista.
- [ ] Cache por pagina e invalidacao simples.
- [ ] Skeleton loading para UX.
