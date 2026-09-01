// Routes para a camada de endpoints de documents.
// Define os endpoints e delega para os controllers.

const express = require('express');
const multer = require('multer');
const path = require('path');
const documentsController = require('../controllers/documents.controller');

const router = express.Router();

// Configura multer para armazenar arquivos no filesystem local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Cria pasta storage se não existir
    const storageDir = path.join(__dirname, '../../storage');
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    // Gera nome único para o arquivo
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${timestamp}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

/**
 * POST /upload
 * Faz upload de um documento.
 * Body: { ownerId? }
 * File: multipart/form-data com campo 'file'
 */
router.post('/upload', upload.single('file'), documentsController.uploadDocument);

/**
 * GET /documents
 * Lista documentos do usuário.
 * Query: { ownerId? }
 * Headers: X-User-Id (alternativa ao query param)
 */
router.get('/documents', documentsController.listDocuments);

/**
 * GET /documents/:id/download
 * Baixa um documento específico.
 * Params: { id }
 * Query: { ownerId? }
 */
router.get('/documents/:id/download', documentsController.downloadDocument);

/**
 * DELETE /documents/:id
 * Deleta um documento.
 * Params: { id }
 * Body: { ownerId? }
 */
router.delete('/documents/:id', documentsController.deleteDocument);

module.exports = router;
