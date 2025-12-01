import { UserModel, EntityModel, LinkModel, PasswordResetModel } from './models.js';
import { hashPassword, comparePassword, createAccessToken, createResetToken } from './utils.js';

export const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      const existing = await UserModel.findByEmail(email);
      if (existing) {
        return res.status(409).json({ error: 'User already exists' });
      }
      const passwordHash = await hashPassword(password);
      const user = await UserModel.createUser(email, passwordHash);
      const token = createAccessToken(user);
      return res.status(201).json({ token });
    } catch (e) {
      return res.status(500).json({ error: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = createAccessToken(user);
      return res.json({ token });
    } catch (e) {
      return res.status(500).json({ error: 'Login failed' });
    }
  },

  requestPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email required' });
      }
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.json({ message: 'If the email exists, a reset link will be sent' });
      }
      const token = createResetToken();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await PasswordResetModel.createToken(user.id, token, expiresAt);
      console.log('0S1NT-M4P reset token:', token);
      return res.json({ message: 'Reset token generated' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to create reset token' });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { token, password } = req.body;
      if (!token || !password) {
        return res.status(400).json({ error: 'Token and password required' });
      }
      const resetRecord = await PasswordResetModel.findByToken(token);
      if (!resetRecord) {
        return res.status(400).json({ error: 'Invalid token' });
      }
      if (resetRecord.expiresAt < new Date()) {
        await PasswordResetModel.deleteToken(resetRecord.id);
        return res.status(400).json({ error: 'Token expired' });
      }
      const passwordHash = await hashPassword(password);
      await UserModel.updatePassword(resetRecord.userId, passwordHash);
      await PasswordResetModel.deleteToken(resetRecord.id);
      return res.json({ message: 'Password updated' });
    } catch (e) {
      return res.status(500).json({ error: 'Password reset failed' });
    }
  }
};

export const EntityController = {
  createEntity: async (req, res) => {
    try {
      const { type, name, description } = req.body;
      if (!type || !name) {
        return res.status(400).json({ error: 'Type and name required' });
      }
      const entity = await EntityModel.createEntity(type, name, description || null);
      return res.status(201).json(entity);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to create entity' });
    }
  },

  getEntities: async (req, res) => {
    try {
      const entities = await EntityModel.getEntities();
      return res.json(entities);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch entities' });
    }
  },

  deleteEntity: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
      }
      await EntityModel.deleteEntity(id);
      return res.json({ message: 'Entity deleted' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to delete entity' });
    }
  }
};

export const LinkController = {
  createLink: async (req, res) => {
    try {
      const { fromId, toId, type } = req.body;
      if (!fromId || !toId || !type) {
        return res.status(400).json({ error: 'fromId, toId and type required' });
      }
      const from = await EntityModel.getEntityById(fromId);
      const to = await EntityModel.getEntityById(toId);
      if (!from || !to) {
        return res.status(400).json({ error: 'Entities not found' });
      }
      const link = await LinkModel.createLink(fromId, toId, type);
      return res.status(201).json(link);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to create link' });
    }
  },

  getLinks: async (req, res) => {
    try {
      const links = await LinkModel.getLinks();
      return res.json(links);
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch links' });
    }
  },

  deleteLink: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'Invalid id' });
      }
      await LinkModel.deleteLink(id);
      return res.json({ message: 'Link deleted' });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to delete link' });
    }
  }
};
