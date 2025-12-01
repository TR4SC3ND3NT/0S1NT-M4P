const prisma = require('./db');

const models = {
  user: {
    findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
    findById: (id) => prisma.user.findUnique({ where: { id } }),
    create: (data) => prisma.user.create({ data }),
  },
  location: {
    create: (data) => prisma.location.create({ data }),
    findByUserId: (userId) => prisma.location.findMany({ where: { userId } }),
    findById: (id) => prisma.location.findUnique({ where: { id } }),
    delete: (id) => prisma.location.delete({ where: { id } }),
  },
  marker: {
    create: (data) => prisma.marker.create({ data }),
    findByLocationId: (locationId) => prisma.marker.findMany({ where: { locationId } }),
    delete: (id) => prisma.marker.delete({ where: { id } }),
  },
};

module.exports = models;
