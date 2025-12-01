const models = require('./models');
const { hashPassword, comparePassword } = require('./utils');
const { generateToken } = require('./utils');

const controllers = {
  auth: {
    register: async (req, res) => {
      try {
        const { email, name, password } = req.body;
        const hashedPassword = await hashPassword(password);
        
        const user = await models.user.create({
          data: { email, name, password: hashedPassword },
        });
        
        const token = generateToken(user.id);
        res.status(201).json({ user, token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    login: async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await models.user.findByEmail(email);
        
        if (!user || !(await comparePassword(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = generateToken(user.id);
        res.json({ user, token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  },
  location: {
    create: async (req, res) => {
      try {
        const { latitude, longitude, title, description } = req.body;
        const userId = req.user.id;
        
        const location = await models.location.create({
          data: { latitude, longitude, title, description, userId },
        });
        
        res.status(201).json(location);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    getAll: async (req, res) => {
      try {
        const locations = await models.location.findByUserId(req.user.id);
        res.json(locations);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  },
  marker: {
    create: async (req, res) => {
      try {
        const { type, data, locationId } = req.body;
        const userId = req.user.id;
        
        const marker = await models.marker.create({
          data: { type, data, locationId, userId },
        });
        
        res.status(201).json(marker);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  },
};

module.exports = controllers;
