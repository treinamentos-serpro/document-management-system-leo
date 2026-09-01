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
    <div className="download-action">
      <button type="button" onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? 'Baixando...' : 'Baixar'}
      </button>
      {error && <small className="error-message">{error}</small>}
    </div>
  );
}