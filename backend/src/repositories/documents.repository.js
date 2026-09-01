// Repository para a camada de persistência de documents.
// Responsável por gerenciar metadados em memória e acesso ao filesystem.

let documents = []; // Armazena metadados dos documentos em memória
let documentIdCounter = 1; // Contador para gerar IDs únicos

/**
 * Cria um novo documento no repositório.
 * @param {Object} documentData - Dados do documento { filename, originalName, size, ownerId }
 * @returns {Object} O documento criado com ID e metadata
 */
function create(documentData) {
  const document = {
    id: documentIdCounter++,
    filename: documentData.filename,
    originalName: documentData.originalName,
    size: documentData.size,
    ownerId: documentData.ownerId,
    uploadedAt: new Date().toISOString(),
  };

  documents.push(document);
  return document;
}

/**
 * Retorna todos os documentos de um usuário.
 * @param {string} ownerId - ID do proprietário
 * @returns {Array} Lista de documentos do usuário
 */
function findByOwnerId(ownerId) {
  return documents.filter(doc => doc.ownerId === ownerId);
}

/**
 * Retorna um documento específico por ID.
 * @param {number} id - ID do documento
 * @returns {Object|null} O documento encontrado ou null
 */
function findById(id) {
  return documents.find(doc => doc.id === Number(id)) || null;
}

/**
 * Retorna todos os documentos.
 * @returns {Array} Lista de todos os documentos
 */
function findAll() {
  return [...documents];
}

/**
 * Remove um documento do repositório.
 * @param {number} id - ID do documento a remover
 * @returns {boolean} true se removido com sucesso
 */
function deleteById(id) {
  const index = documents.findIndex(doc => doc.id === Number(id));
  if (index === -1) return false;
  documents.splice(index, 1);
  return true;
}

module.exports = {
  create,
  findByOwnerId,
  findById,
  findAll,
  deleteById,
};
