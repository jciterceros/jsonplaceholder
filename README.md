# Jsonplaceholder

Projeto Angular para listagem de usuarios da API JSONPlaceholder, com tema dark/light, filtros e paginação.

## Requisitos

- Node.js 20+
- npm 10+

## Instalação

```bash
npm ci
```

## Execução local

```bash
npm run start
```

Acesse: `http://localhost:4200/`

## Execução em rede local (LAN)

```bash
npm run start:lan
```

Depois, acesse pelo celular/dispositivo na mesma rede:

`http://SEU_IP_LOCAL:4200/`

Exemplo: `http://192.168.0.27:4200/`

## Qualidade de código

```bash
npm run lint
npm run format:check
npm run format
```

## Build

```bash
npm run build
```

## Testes

```bash
npm run test
```

## CI (GitHub Actions)

O workflow em `.github/workflows/ci.yml` roda automaticamente em push/PR com:

- `npm install --include=optional`
- `npm run lint`
- `npm run build`
- `npm run test -- --watch=false`

## Arquitetura evolutiva

Para evolucao por resource com Clean Architecture:

- `docs/architecture/feature-clean-architecture.md`
- `docs/architecture/resource-template.md`
- `docs/architecture/pr-roadmap.md` (proximos PRs apos a #1 de migracao users; alinhamento a estrutura alvo)

## Checklist de PR

Antes de abrir PR, valide:

- [ ] `npm run lint`
- [ ] `npm run format:check`
- [ ] `npm run test -- --watch=false`
- [ ] `npm run build`
- [ ] README atualizado quando houver mudança de fluxo/comandos
