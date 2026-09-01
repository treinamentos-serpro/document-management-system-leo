---
description: Aplica Tailwind CSS 3 ao frontend do DMS, melhorando o visual dos componentes sem alterar a lógica existente.
name: melhorar-visual-tailwind
agent: tailwind-ui
---

# Melhorar visual com Tailwind CSS 3

Use o agente `tailwind-ui` para modernizar a interface do Document Management System.

## Escopo

- Instalar e configurar Tailwind CSS 3 no `frontend` (`tailwind.config.js`,
  `postcss.config.js` e diretivas `@tailwind` no CSS global importado em `main.jsx`).
- Restilizar `App.jsx`, `components/UploadComponent.jsx`, `components/DocumentList.jsx`
  e `components/DownloadButton.jsx` com classes utilitárias Tailwind, substituindo os
  estilos inline/CSS-in-JS atuais.
- Manter toda a lógica existente: props, hooks, chamadas a `services/documentsApi.js`
  e o contrato com o backend via `/api`.

## Resultado esperado

- Layout claro e responsivo para as telas de upload, listagem e download.
- Estados de carregamento, erro, sucesso e lista vazia visualmente distintos.
- `npm run build` no `frontend` passando sem erros ao final.
