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
    return <p className="empty-state">Carregando documentos...</p>;
  }

  if (documents.length === 0) {
    return <p className="empty-state">Nenhum documento enviado ainda.</p>;
  }

  return (
    <section className="document-list" aria-labelledby="document-list-title">
      <h2 id="document-list-title">Documentos</h2>
      <ul>
        {documents.map((document) => (
          <li key={document.id} className="document-item">
            <div>
              <strong>{document.originalName}</strong>
              <span>
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