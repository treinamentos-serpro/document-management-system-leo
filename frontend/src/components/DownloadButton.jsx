import { useState } from 'react';
import { downloadDocument } from '../services/documentsApi';

export default function DownloadButton({ document }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState('');

  async function handleDownload() {
    setIsDownloading(true);
    setError('');

    try {
      const blob = await downloadDocument(document.id, document.ownerId);
      const downloadUrl = URL.createObjectURL(blob);
      const link = window.document.createElement('a');

      link.href = downloadUrl;
      link.download = document.originalName;
      link.click();
      URL.revokeObjectURL(downloadUrl);
    } catch (downloadError) {
      setError(downloadError.message);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="grid justify-items-stretch gap-1 sm:justify-items-end">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className="rounded-md bg-teal-700 px-4 py-3 font-medium text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDownloading ? 'Baixando...' : 'Baixar'}
      </button>
      {error && <small className="font-medium text-red-700">{error}</small>}
    </div>
  );
}