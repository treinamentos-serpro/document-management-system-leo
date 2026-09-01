import { useState } from 'react';
import { uploadDocument } from '../services/documentsApi';

export default function UploadComponent({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleFileChange(event) {
    setSelectedFile(event.target.files[0] || null);
    setMessage('');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFile) {
      setError('Selecione um arquivo para enviar.');
      return;
    }

    setIsUploading(true);
    setError('');
    setMessage('');

    try {
      await uploadDocument(selectedFile);
      setSelectedFile(null);
      event.target.reset();
      setMessage('Documento enviado com sucesso.');
      onUploadSuccess();
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section
      className="rounded-lg border border-stone-300 bg-white p-6"
      aria-labelledby="upload-title"
    >
      <h2 id="upload-title" className="mb-4 text-lg font-semibold text-slate-900">
        Enviar documento
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <label htmlFor="document-file" className="text-sm font-medium text-slate-700">
          Arquivo
        </label>
        <input
          id="document-file"
          name="file"
          type="file"
          onChange={handleFileChange}
          disabled={isUploading}
          className="rounded-md border border-stone-300 p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-teal-700 file:px-3 file:py-2 file:text-white disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isUploading}
          className="justify-self-start rounded-md bg-teal-700 px-4 py-3 font-medium text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {message && <p className="mt-3 font-medium text-teal-700">{message}</p>}
      {error && <p className="mt-3 font-medium text-red-700">{error}</p>}
    </section>
  );
}