# C4 Level 1 — System Context

Este diagrama mostra quem usa o sistema e com quais sistemas externos ele se integra.

```mermaid
flowchart LR
  User["Pessoa usuaria"] --> App["JSONPlaceholder Angular App"]
  App --> API["JSONPlaceholder API"]
```

## Responsabilidades

- A pessoa usuaria interage com a interface web.
- A aplicacao Angular processa estado, navegacao e renderizacao.
- A API JSONPlaceholder fornece os dados consumidos pela feature `users`.
