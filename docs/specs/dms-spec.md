## Plan: Especificacao Completa do DMS

**Steps**
1. Criar `docs/specs/dms-spec.md` a partir das oito secoes do template, identificando objetivo, usuarios e escopo do MVP.
2. Detalhar RF-01 a RF-03 com precondicoes, fluxo principal, resultado esperado e regras de falha; incluir a gestao simples por usuario como associacao obrigatoria do documento ao campo `owner`.
3. Expandir requisitos nao funcionais: armazenamento exclusivo em `backend/storage` via `multer.diskStorage`, metadados apenas em memoria, configuracao por ambiente, seguranca de caminho no download e tratamento de erros HTTP.
4. Consolidar o modelo de dados: metadados publicos (`id`, `originalName`, `size`, `uploadedAt`, `owner`) e atributos internos nao expostos necessarios para localizar o arquivo fisico (`storedFilename`/caminho relativo). Definir tipos, obrigatoriedade, imutabilidade e ciclo de vida em memoria.
5. Especificar contratos completos para `POST /upload`, `GET /documents` e `GET /documents/:id/download`: prefixo de desenvolvimento `/api`, requisicoes e respostas, codigos de sucesso/erro, cabecalhos de download, exemplos JSON e regra de nao exposicao do caminho local.
6. Registrar a arquitetura-alvo e responsabilidades pelas camadas `routes -> controllers -> services -> repositories`, incluindo a configuracao do multer no limite HTTP e a separacao entre persistencia de arquivo e metadados em memoria.
7. Incluir plano de execucao por etapas, limitado a orientar a futura implementacao: fundacao/backend, testes backend, frontend e integracao/verificacao. Nomear os arquivos futuros apenas como referencia, sem criar ou editar nenhum deles agora.
8. Revisar o documento contra o template e as restricoes do repositorio, confirmando que somente `docs/specs/dms-spec.md` sera o artefato de produto previsto.

**Relevant files**
- `/workspaces/document-management-system-leo/docs/specs/spec-template.md` — estrutura obrigatoria de oito secoes a ser expandida.
- `/workspaces/document-management-system-leo/.github/copilot-instructions.md` — restricoes de Clean Architecture, multer/diskStorage, armazenamento local e padroes de linguagem.
- `/workspaces/document-management-system-leo/backend/src/app.js` — estado seed e endpoint `GET /health` a preservar na futura implementacao.
- `/workspaces/document-management-system-leo/frontend/vite.config.js` — proxy de desenvolvimento que estabelece o prefixo `/api` no frontend.

**Verification**
1. Confirmar que `dms-spec.md` segue todas as secoes do template e cobre objetivo, escopo, RFs, RNFs, modelo de dados, contratos, arquitetura e plano de execucao.
2. Revisar cada contrato contra os tres endpoints previstos e garantir que erros esperados e formatos de resposta estejam definidos.
3. Confirmar no diff que nenhum arquivo em `backend/` ou `frontend/` foi criado ou modificado.

**Decisions**
- Artefato desta solicitacao: somente `/workspaces/document-management-system-leo/docs/specs/dms-spec.md`; a implementacao fica fora do escopo.
- Provisoriamente, o upload recebera `owner` como campo obrigatorio do `multipart/form-data`; usuario pediu que esta politica seja verificada depois.
- Provisoriamente, nao havera limite de tamanho nem filtro MIME alem das capacidades do filesystem/multer; usuario pediu que a politica seja verificada depois.
- Provisoriamente, a listagem retornara somente metadados publicos e o arquivo sera baixado exclusivamente por ID; usuario pediu que esta exposicao seja verificada depois.
- Nao incluir armazenamento externo, banco de dados, autenticacao/autorizacao real, versionamento, exclusao ou atualizacao de documentos.

**Further Considerations**
1. Antes da implementacao, validar se `owner` deve migrar para autenticacao/cabecalho em vez de campo multipart.
2. Antes da exposicao em ambiente compartilhado, definir tipos MIME aceitos, tamanho maximo e requisitos de antivirus/varredura.
