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
    <main className="min-h-screen bg-stone-100 px-4 py-8 text-slate-800 sm:px-8">
      <section className="mx-auto mb-8 max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-teal-700">
          Document Management System
        </p>
        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
          Gestão de documentos
        </h1>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600">
          Envie arquivos, acompanhe os metadados e baixe documentos cadastrados
          no armazenamento local da aplicação.
        </p>
      </section>

      <div className="mx-auto grid max-w-3xl gap-6">
        <UploadComponent onUploadSuccess={loadDocuments} />
        {error && <p className="font-medium text-red-700">{error}</p>}
        <DocumentList documents={documents} isLoading={isLoading} />
      </div>
    </main>
  );
}
