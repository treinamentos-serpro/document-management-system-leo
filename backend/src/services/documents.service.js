// Service para a camada de negócio de documents.
// Responsável pelas regras e validações de negócio.

const fs = require('fs').promises;
const path = require('path');
const documentsRepository = require('../repositories/documents.repository');

const STORAGE_PATH = path.join(__dirname, '../../storage');

/**
 * Processa o upload de um documento.
 * @param {Object} file - Objeto do multer com os dados do arquivo
 * @param {string} ownerId - ID do proprietário do documento
 * @returns {Object} Metadados do documento salvo
 * @throws {Error} Se houver erro no armazenamento
 */
async function uploadDocument(file, ownerId) {
  if (!file) {
    throw new Error('Nenhum arquivo foi enviado');
  }

  if (!ownerId) {
    throw new Error('ID do proprietário é obrigatório');
  }

  // Validações básicas
  const maxFileSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxFileSize) {
    throw new Error('Arquivo excede o tamanho máximo permitido (10MB)');
  }

  const documentData = {
    filename: file.filename, // Nome gerado pelo multer (salvo no filesystem)
    originalName: file.originalname, // Nome original do arquivo
    size: file.size,
    ownerId,
  };

  // Salva metadados em memória
  const savedDocument = documentsRepository.create(documentData);

  return savedDocument;
}

/**
 * Retorna todos os documentos de um usuário.
 * @param {string} ownerId - ID do proprietário
 * @returns {Array} Lista de documentos
 */
function getDocumentsByOwner(ownerId) {
  if (!ownerId) {
    throw new Error('ID do proprietário é obrigatório');
  }

  return documentsRepository.findByOwnerId(ownerId);
}

/**
 * Retorna um documento específico.
 * @param {number} documentId - ID do documento
 * @returns {Object} Metadados do documento
 * @throws {Error} Se o documento não for encontrado
 */
function getDocumentById(documentId) {
  const document = documentsRepository.findById(documentId);

  if (!document) {
    throw new Error(`Documento com ID ${documentId} não encontrado`);
  }

  return document;
}

/**
 * Retorna o caminho completo do arquivo armazenado.
 * @param {number} documentId - ID do documento
 * @returns {string} Caminho completo do arquivo
 * @throws {Error} Se o documento não for encontrado
 */
function getDocumentFilePath(documentId) {
  const document = getDocumentById(documentId);
  return path.join(STORAGE_PATH, document.filename);
}

/**
 * Deleta um documento (metadados e arquivo).
 * @param {number} documentId - ID do documento
 * @param {string} ownerId - ID do proprietário (para validação)
 * @throws {Error} Se a operação falhar
 */
async function deleteDocument(documentId, ownerId) {
  const document = getDocumentById(documentId);

  // Valida se o documento pertence ao usuário
  if (document.ownerId !== ownerId) {
    throw new Error('Você não tem permissão para deletar este documento');
  }

  // Remove arquivo do filesystem
  const filePath = path.join(STORAGE_PATH, document.filename);
  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.error(`Erro ao remover arquivo ${filePath}:`, error.message);
    // Continua mesmo se o arquivo não existir
  }

  // Remove metadados
  documentsRepository.deleteById(documentId);
}

module.exports = {
  uploadDocument,
  getDocumentsByOwner,
  getDocumentById,
  getDocumentFilePath,
  deleteDocument,
};
