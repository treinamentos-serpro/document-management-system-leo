import DownloadButton from './DownloadButton';

function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  }

  if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(1)} KB`;
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'data indisponível';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);
}

export default function DocumentList({ documents, isLoading }) {
  if (isLoading) {
    return <p className="text-slate-500">Carregando documentos...</p>;
  }

  if (documents.length === 0) {
    return <p className="text-slate-500">Nenhum documento enviado ainda.</p>;
  }

  return (
    <section
      className="rounded-lg border border-stone-300 bg-white p-6"
      aria-labelledby="document-list-title"
    >
      <h2 id="document-list-title" className="mb-4 text-lg font-semibold text-slate-900">
        Documentos
      </h2>
      <ul className="grid gap-3">
        {documents.map((document) => (
          <li
            key={document.id}
            className="flex flex-col items-stretch gap-4 rounded-lg border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="grid min-w-0 gap-1">
              <strong className="break-words text-slate-900">{document.originalName}</strong>
              <span className="text-sm text-slate-500">
                {formatFileSize(document.size)} · Enviado em{' '}
                {formatDate(document.uploadedAt)}
              </span>
            </div>
            <DownloadButton document={document} />
          </li>
        ))}
      </ul>
    </section>
  );
}