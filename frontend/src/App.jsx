import { useEffect, useState } from 'react';
import DocumentList from './components/DocumentList';
import UploadComponent from './components/UploadComponent';
import { listDocuments } from './services/documentsApi';

export default function App() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadDocuments() {
    setIsLoading(true);
    setError('');

    try {
      const data = await listDocuments();
      setDocuments(data.documents);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  return (
    <main style={styles.page}>
      <section style={styles.header}>
        <p style={styles.eyebrow}>Document Management System</p>
        <h1 className="page-title">Gestão de documentos</h1>
        <p style={styles.description}>
          Envie arquivos, acompanhe os metadados e baixe documentos cadastrados
          no armazenamento local da aplicação.
        </p>
      </section>

      <div style={styles.content}>
        <UploadComponent onUploadSuccess={loadDocuments} />
        {error && <p className="error-message">{error}</p>}
        <DocumentList documents={documents} isLoading={isLoading} />
      </div>

      <style>{`
        body {
          margin: 0;
          background: #f4f1ea;
          color: #1f2933;
          font-family: Georgia, 'Times New Roman', serif;
        }

        button,
        input {
          font: inherit;
        }

        button {
          border: 0;
          border-radius: 6px;
          background: #245c52;
          color: #ffffff;
          cursor: pointer;
          padding: 0.75rem 1rem;
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .upload-panel,
        .document-list {
          background: #ffffff;
          border: 1px solid #ddd6c8;
          border-radius: 8px;
          padding: 1.5rem;
        }

        .upload-panel h2,
        .document-list h2 {
          margin: 0 0 1rem;
        }

        .upload-panel form {
          display: grid;
          gap: 0.75rem;
        }

        .upload-panel input {
          border: 1px solid #c9c0b1;
          border-radius: 6px;
          padding: 0.75rem;
        }

        .document-list ul {
          display: grid;
          gap: 0.75rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .document-item {
          align-items: center;
          border: 1px solid #e7e0d4;
          border-radius: 8px;
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          padding: 1rem;
        }

        .document-item div:first-child {
          display: grid;
          gap: 0.25rem;
          min-width: 0;
        }

        .document-item strong {
          overflow-wrap: anywhere;
        }

        .document-item span,
        .empty-state {
          color: #5d6875;
        }

        .download-action {
          display: grid;
          gap: 0.35rem;
          justify-items: end;
        }

        .success-message {
          color: #245c52;
          margin-bottom: 0;
        }

        .error-message {
          color: #b42318;
          margin-bottom: 0;
        }

        .page-title {
          font-size: 3rem;
          line-height: 0.98;
          margin: 0;
        }

        @media (min-width: 720px) {
          .page-title {
            font-size: 4.5rem;
          }
        }

        @media (max-width: 640px) {
          .document-item {
            align-items: stretch;
            flex-direction: column;
          }

          .download-action {
            justify-items: stretch;
          }
        }
      `}</style>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    padding: '2rem',
  },
  header: {
    margin: '0 auto 2rem',
    maxWidth: '880px',
  },
  eyebrow: {
    color: '#245c52',
    fontFamily: 'Verdana, sans-serif',
    fontSize: '0.8rem',
    letterSpacing: '0.08em',
    margin: '0 0 0.5rem',
    textTransform: 'uppercase',
  },
  description: {
    color: '#4d5966',
    fontFamily: 'Verdana, sans-serif',
    fontSize: '1rem',
    lineHeight: 1.6,
    maxWidth: '680px',
  },
  content: {
    display: 'grid',
    gap: '1.5rem',
    margin: '0 auto',
    maxWidth: '880px',
  },
};
