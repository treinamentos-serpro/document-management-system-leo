const API_BASE_URL = '/api';

async function parseErrorResponse(response) {
  try {
    const data = await response.json();
    return data.error || 'Erro ao comunicar com o servidor';
  } catch {
    return 'Erro ao comunicar com o servidor';
  }
}

async function requestJson(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  return response.json();
}

export async function uploadDocument(file, ownerId = 'anonymous') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('ownerId', ownerId);

  return requestJson('/upload', {
    method: 'POST',
    body: formData,
  });
}

export async function listDocuments(ownerId = 'anonymous') {
  const params = new URLSearchParams({ ownerId });
  return requestJson(`/documents?${params.toString()}`);
}

export async function downloadDocument(documentId, ownerId = 'anonymous') {
  const params = new URLSearchParams({ ownerId });
  const response = await fetch(
    `${API_BASE_URL}/documents/${documentId}/download?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response));
  }

  return response.blob();
}