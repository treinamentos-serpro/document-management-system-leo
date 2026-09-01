// Controller para a camada de entrada/saída HTTP de documents.
// Responsável por validar requisições e preparar respostas.

const fs = require('fs');
const documentsService = require('../services/documents.service');

/**
 * POST /upload - Faz upload de um documento
 * @param {Object} req - Request do Express
 * @param {Object} res - Response do Express
 */
async function uploadDocument(req, res) {
  try {
    // Obtém o ID do proprietário (em um cenário real viria da autenticação)
    const ownerId = req.body.ownerId || req.headers['x-user-id'] || 'anonymous';

    // Processa o upload através do service
    const document = await documentsService.uploadDocument(req.file, ownerId);

    res.status(201).json({
      message: 'Documento enviado com sucesso',
      document,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

/**
 * GET /documents - Lista documentos do usuário
 * @param {Object} req - Request do Express
 * @param {Object} res - Response do Express
 */
function listDocuments(req, res) {
  try {
    // Obtém o ID do proprietário
    const ownerId = req.query.ownerId || req.headers['x-user-id'] || 'anonymous';

    const documents = documentsService.getDocumentsByOwner(ownerId);

    res.json({
      documents,
      count: documents.length,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

/**
 * GET /documents/:id/download - Baixa um documento
 * @param {Object} req - Request do Express
 * @param {Object} res - Response do Express
 */
function downloadDocument(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.query.ownerId || req.headers['x-user-id'] || 'anonymous';

    // Valida se o documento existe e pertence ao usuário
    const document = documentsService.getDocumentById(id);
    if (document.ownerId !== ownerId) {
      return res.status(403).json({
        error: 'Você não tem permissão para baixar este documento',
      });
    }

    // Obtém o caminho do arquivo
    const filePath = documentsService.getDocumentFilePath(id);

    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: 'Arquivo não encontrado no servidor',
      });
    }

    // Envia o arquivo
    res.download(filePath, document.originalName);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
}

/**
 * DELETE /documents/:id - Deleta um documento
 * @param {Object} req - Request do Express
 * @param {Object} res - Response do Express
 */
async function deleteDocument(req, res) {
  try {
    const { id } = req.params;
    const ownerId = req.body.ownerId || req.headers['x-user-id'] || 'anonymous';

    await documentsService.deleteDocument(id, ownerId);

    res.json({
      message: 'Documento deletado com sucesso',
    });
  } catch (error) {
    if (error.message.includes('não encontrado')) {
      return res.status(404).json({
        error: error.message,
      });
    }
    if (error.message.includes('permissão')) {
      return res.status(403).json({
        error: error.message,
      });
    }
    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = {
  uploadDocument,
  listDocuments,
  downloadDocument,
  deleteDocument,
};
