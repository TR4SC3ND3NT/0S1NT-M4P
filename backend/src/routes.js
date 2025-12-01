import express from 'express';
import { AuthController, EntityController, LinkController } from './controllers.js';
import authMiddleware from './authMiddleware.js';

const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/password/forgot', AuthController.requestPasswordReset);
router.post('/auth/password/reset', AuthController.resetPassword);

router.get('/entities', authMiddleware, EntityController.getEntities);
router.post('/entities', authMiddleware, EntityController.createEntity);
router.delete('/entities/:id', authMiddleware, EntityController.deleteEntity);

router.get('/links', authMiddleware, LinkController.getLinks);
router.post('/links', authMiddleware, LinkController.createLink);
router.delete('/links/:id', authMiddleware, LinkController.deleteLink);

export default router;
